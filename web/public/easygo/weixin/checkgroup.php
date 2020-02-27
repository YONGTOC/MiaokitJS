<?php
    function getToken(){
        $appid = "wx39f9f8202e74dd84";
        $appsecret = "fc3249ba97c244c584f5756eef9106fa";
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";

        $data = json_decode(get_php_file("access_token.php"));
        if ($data->expire_time < time()) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            $output = curl_exec($ch);
            curl_close($ch);
            // var_dump($output);
            // die;
            $jsoninfo1 = json_decode($output, true);
            // var_dump($jsoninfo1);
            // die;
            $access_token = $jsoninfo1["access_token"];

            if ($access_token) {
                $data->expire_time = time() + 7000;
                $data->access_token = $access_token;
                set_php_file("access_token.php", json_encode($data));
            }
            } else {
            $access_token = $data->access_token;
            }


        return $access_token;
    }

    function curlData($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        //curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //设置post方式提交
        curl_setopt($ch, CURLOPT_POST, 1);
        //设置post数据
        $post_data = array(
            "group_name" => "group1"
        );
        $post_data =json_encode($post_data);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }

    function getcode(){
        $appid = "wx39f9f8202e74dd84";
        $appsecret = "fc3249ba97c244c584f5756eef9106fa";
        // $access_token = getToken();
        $access_token = getToken();
        $ACCESS_TOKEN = $access_token;
            // echo $code;
            $url = "https://api.weixin.qq.com/shakearound/device/group/add?access_token=$ACCESS_TOKEN";
            $output = curlData($url);

            // $jsoninfo1 = json_decode($output, true);
            // $openid = $jsoninfo1["openid"];

            echo $output;
        
    }
    function get_php_file($filename) {
   return trim(substr(file_get_contents($filename), 15));
}
function set_php_file($filename, $content) {
  $fp = fopen($filename, "w");
  fwrite($fp, "<?php exit();?>".$content);
  fclose($fp);
}

    getcode();
?>