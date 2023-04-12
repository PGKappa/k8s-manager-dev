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
            'type' => 'summary',
            'groupBy' => 'shop',
            'fromDate' => Carbon::parse($fromDate),
            'toDate' => Carbon::parse($toDate),
            'user' => $request->user('manager'),
        ]);
        // return response()->json($reports);

        $columns = ['ShopID', 'In', 'Out', 'Profit'];

        $callback = function () use ($reports, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($reports['reports'] as $report) {
                $row['ShopID'] = $report['shop_id'];
                $row['In'] = $report['sumIn'];
                $row['Out'] = $report['sumOut'];
                $row['Profit'] = $report['concatPercentage'];

                fputcsv($file, [$row['ShopID'], $row['In'], $row['Out'], $row['Profit']]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
        // return Response::download($callback,"dadad.csv", $headers);

        return response()->json([
            'fileName' => $fileName,
            'report' => $callback,
        ]);
    }
}
