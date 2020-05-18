<?php
    function curlData($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }

    function getcode(){
        $appid = "wx39f9f8202e74dd84";
        $appsecret = "d295aa43e01f37f44098f4f72da47ab2";

        if(isset($_GET['code']) == false){
            echo "请将url作为参数传递";
        }else{
            $code = $_GET['code'];
            // echo $code;
            $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
            $output = curlData($url);

            // $jsoninfo1 = json_decode($output, true);
            // $openid = $jsoninfo1["openid"];

            echo $output;
        }
        
    }
    
    getcode();
?>