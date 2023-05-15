<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;use Illuminate\Http\Request;
use Exception;

class ExportController extends Controller
{
    /**
     * Exports tickets into csv
     * @param Request $request
     * 
     * $request->week
     * $request->eventType string 1 = all , 2 = dogs6 , 3 horses6
     * 
     * @return Response->json
     */
    public function getReportCSV(Request $request)
    {
        /* Format Year and Week from input (example: 2021-W52) */
        $yearAndWeek = explode('-', $request->week);
        $year = $yearAndWeek[0];

        $week = substr($yearAndWeek[1], 1); // Removes the W in W52
        $fileName = 'PGVirtualReport' . $year . '-' . $week . '.csv';

        $headers = [
            'Content-type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=$fileName",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $fromDate = Carbon::now()->setISODate($year, $week)->startOfWeek()->toDateTimeString()
            ?? \Carbon\Carbon::now()->startOfWeek()->toDateTimeString();
        $toDate = Carbon::now()->setISODate($year, $week)->endOfWeek()->toDateTimeString()
            ?? \Carbon\Carbon::now()->endOfWeek()->toDateTimeString();

        $reports = ReportController::getReport([
            // 'type' => 'summary',
            // 'groupBy' => 'shop',
            "type" => "transaction",
            'fromDate' => $fromDate,
            'toDate' => $toDate,
            'user' => $request->user('manager'),
            "userLanguage" => "en-GB",
            "mode" => "transaction",
            "divideByGames" => true,
        ]);

        $callback = self::createExport($reports, $request->eventType);

        return response()->stream($callback, 200, $headers);

        return response()->json([
            'fileName' => $fileName,
            'report' => $callback,
        ]);
    }

    /**
     * Exports tickets into csv
     * @param Request $request
     * 
     * @param Ticket $reports
     * @param $eventType string 1 = all , 2 = dogs6 , 3 horses6
     * 
     * @return Response->json
     */
    public function createExport($reports, $eventType)
    {
        $columns = ['User', 'TicketId', 'In', "Out", 'Profit'];

        $callback = function () use ($reports, $columns, $eventType) {
            $totalDogs6In = 0;
            $totalDogs6Out = 0;
            $totalHorses6In = 0;
            $totalHorses6Out = 0;

            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($reports['reports'] as $report) {
                if ($eventType === "1") {
                    $row["In"] = $report["amount_in"];
                    $row["Out"] = $report["amount_out"];
                    $row['User'] = $report['user_id'];
                    $row["TicketId"] = $report['external_id'];
                    $row["Time"] = $report["Time"];
                } else if ($eventType === "2" && !empty($report["dogs6"])) {
                    $row["In"] = $report["dogs6"]["amountIn"];
                    $row["Out"] = $report["dogs6"]["amountOut"];
                    $row['User'] = $report['user_id'];
                    $row["TicketId"] = $report['external_id'];
                    $row["Time"] = $report["Time"];

                    $totalDogs6In += $report["dogs6"]["amountIn"];
                    $totalDogs6Out += $report["dogs6"]["amountOut"];
                } else if ($eventType === "3" && !empty($report["horses6"])) {
                    $row["In"] = $report["horses6"]["amountIn"];
                    $row["Out"] = $report["horses6"]["amountIn"];
                    $row['User'] = $report['user_id'];
                    $row["TicketId"] = $report['external_id'];
                    $row["Time"] = $report["Time"];

                    $totalHorses6In += $report["horses6"]["amountIn"];
                    $totalHorses6Out += $report["horses6"]["amountOut"];
                }

                if (!empty($row)) fputcsv($file, [$row['User'], $row['TicketId'], $row['In'], $row['Out'], $row["Time"]]);
            }

            if ($eventType === "1") {
                fputcsv($file, ["Total", "", $reports["totalSum"]['amount_in'], $reports["totalSum"]['amount_out'], ""]);
            } else if ($eventType === "2") {
                fputcsv($file, ["Total", "", $totalDogs6In, $totalDogs6Out, ""]);
            } else if ($eventType === "3") {
                fputcsv($file, ["Total", "", $totalHorses6In, $totalHorses6Out, ""]);
            }

            fclose($file);
        };


        return $callback;
    }
}
