<?php

namespace PGVirtual\Manager\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FrontendController extends Controller
{
    private static $REGEX_ASSETS_FILES = '/(.+\.(css|js|png))\??.*$/m';

    private static $REGEX_HTML_FILES = '/(([a-zA-Z0-9]+\/?)+)(\.html)?\??.*$/m';

    public function showApp(Request $request, $all = 'index')
    {
        // echo $all;
        // escapeshellcmd(escapeshellarg($all)))
        $all = escapeshellcmd(htmlentities(htmlspecialchars($all)));

        // $all = pathinfo($all, PATHINFO_FILENAME);
        $output_array = [];
        $isAsset = preg_match(self::$REGEX_ASSETS_FILES, $all, $output_array);

        if ($isAsset >= 1) {
            // dd($output_array);

            $fileName = $output_array[1];
            $path = public_path() . "/manager/$fileName";
            // dd($path);
            $fileContent = File::get($path);
            $matchAllCss = preg_match_all('/\.css$/m', $fileName, $matches, PREG_SET_ORDER, 0);
            if ($matchAllCss > 0) {
                return response($fileContent)->header('Content-Type', 'text/css');
            }

            $matchAllJs = preg_match_all('/\.js$/m', $fileName, $matches, PREG_SET_ORDER, 0);
            if ($matchAllJs > 0) {
                return response($fileContent)->header('Content-Type', 'application/javascript');
            }

            $matchAllPng = preg_match_all('/\.png$/m', $fileName, $matches, PREG_SET_ORDER, 0);
            if ($matchAllPng > 0) {
                return response($fileContent)->header('Content-Type', 'image/png');
            }
        } else {
            $result = preg_replace(self::$REGEX_HTML_FILES, '$1', $all);
            $result = rtrim($result, '/');
            $result = rtrim($result, '.html');
            $path = public_path() . "/manager/$result.html";
        }

        return File::get($path);
    }
}
