<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExportController extends Controller
{
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
            "mode" => "transaction"
        ]);

        $columns = ['User', 'TicketId', 'In', "Out"];
        // dd($reports);
        $callback = function () use ($reports, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($reports['reports'] as $report) {
                $row['User'] = $report['user_id'];
                $row["TicketId"] = $report['external_id'];
                $row["In"] = $report["amount_in"];
                $row["Out"] = $report["amount_out"];
                $row["Time"] = $report["Time"];

                fputcsv($file, [$row['User'], $row['TicketId'], $row['In'], $row['Out'], $row["Time"]]);
            }
            fputcsv($file, ["Total", "", $reports["totalSum"]['amount_in'], $reports["totalSum"]['amount_out'], ""]);

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);

        return response()->json([
            'fileName' => $fileName,
            'report' => $callback,
        ]);
    }
}
