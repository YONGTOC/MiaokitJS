<?php
/* 获取token */

function getToken(){
    $appid = "wx39f9f8202e74dd84";
    $appsecret = "d295aa43e01f37f44098f4f72da47ab2";
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
          $jsoninfo1 = json_decode($output, true);
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

/* 获取ticket */
function getTicket($access_token){
    $ACCESS_TOKEN = $access_token;
    $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$ACCESS_TOKEN&type=jsapi";

     $data = json_decode(get_php_file("jsapi_ticket.php"));
     if ($data->expire_time < time()) {
           $ch = curl_init();
           curl_setopt($ch, CURLOPT_URL, $url);
           curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
           curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
           curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
           $output = curl_exec($ch);
           curl_close($ch);
           $jsoninfo = json_decode($output, true);
           $ticket = $jsoninfo["ticket"];

           if ($ticket) {
                $data->expire_time = time() + 7000;
                $data->jsapi_ticket = $ticket;
                set_php_file("jsapi_ticket.php", json_encode($data));
           }
     } else {
         $ticket =$data->jsapi_ticket;
     }

    return $ticket;
}

/* 生成签名 */
function getSign(){
    $access_token = getToken();
    $ticket = getTicket($access_token);

    $wx = array();
    //生成签名的时间戳
    $wx['Timestamp'] = time();
    //生成签名的随机串
    $wx['Noncestr'] = createNonceStr();
    //jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。
    $wx['jsapi_ticket'] = $ticket;
    //分享的地址，注意：这里是指当前网页的URL，不包含#及其后面部分，曾经的我就在这里被坑了，所以小伙伴们要小心了
    if(isset($_GET['url']) == false){
        echo "请将url作为参数传递";
    }else{
        $wx['url'] = $_GET['url'];
        $string = sprintf("jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s", $wx['jsapi_ticket'], $wx['Noncestr'], $wx['Timestamp'], $wx['url']);
        //生成签名
        $wx['Signature'] = sha1($string);
        $wx['Appid'] = "wx39f9f8202e74dd84";

        echo json_encode($wx);
    }
}

function get_php_file($filename) {
   return trim(substr(file_get_contents($filename), 15));
}
function set_php_file($filename, $content) {
  $fp = fopen($filename, "w");
  fwrite($fp, "<?php exit();?>".$content);
  fclose($fp);
}

function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

getSign();
?>