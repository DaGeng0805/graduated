package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.DriverInfo;
import com.mjmju.zj.transport_manage.entity.SiteManagerInfo;
import com.mjmju.zj.transport_manage.mapper.DriverInfoMapper;
import com.mjmju.zj.transport_manage.mapper.SiteManagerInfoMapper;
import com.mysql.jdbc.log.LogFactory;
import com.yunpian.sdk.YunpianClient;
import com.yunpian.sdk.model.Result;
import com.yunpian.sdk.model.SmsSingleSend;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@Service
public class LoginService {

    //Logger logger = LogFactory.getLogger(LoginService.class);

    @Autowired
    SiteManagerInfoMapper managerMapper;

    @Autowired
    DriverInfoMapper driverInfoMapper;


    /**
     * @Description:判断手机号数据库中是否拥有，有则不发送
     * @Param: [phone]手机号
     * @return: java.lang.String
     * @Author: 郑军
     * @Date: 2020/2/5
     */
//    public String checkManagerPhone(String phone) {
//
//        SiteManagerInfo siteManagerInfo = managerMapper.findByPhone(phone);
//        if (siteManagerInfo != null) {//说明里面有这个电话号码
//            //初始化clnt,使用单例方式
//            YunpianClient clnt = new YunpianClient("9391569295ef19c147b8447633d40aba").init();
//
//            SiteManagerInfo saveCode = new SiteManagerInfo();
//            //发送短信API
//            Map<String, String> param = clnt.newParam(2);
//            param.put(YunpianClient.MOBILE, phone);
//            String code = getNonce_str();
//
//
//            SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            String now = tempDate.format(new java.util.Date());
//            //入库
//            saveCode.setCode(code);
//            saveCode.setCodeTime(now);
//            managerMapper.insertCode(saveCode);
//
//            param.put(YunpianClient.TEXT, "【智慧物流】您的验证码是"+code);
//            Result<SmsSingleSend> r = clnt.sms().single_send(param);
//            //获取返回结果，返回码:r.getCode(),返回码描述:r.getMsg(),API结果:r.getData(),其他说明:r.getDetail(),调用异常:r.getThrowable()
//            //账户:clnt.user().* 签名:clnt.sign().* 模版:clnt.tpl().* 短信:clnt.sms().* 语音:clnt.voice().* 流量:clnt.flow().* 隐私通话:clnt.call().*
//            //释放clnt
//            clnt.close();
//            return "2";
//        }
//        return "1";
//    }
//
//
//    /**
//     * @Description:判断手机号数据库中是否拥有，有则不发送
//     * @Param: [phone]手机号
//     * @return: java.lang.String
//     * @Author: 郑军
//     * @Date: 2020/2/5
//     */
//    public String checkDriverPhone(String phone) {
//
//        DriverInfo driverInfo = driverInfoMapper.findByPhone(phone);
//        if (driverInfo != null) {//说明里面有这个电话号码
//            //初始化clnt,使用单例方式
//            YunpianClient clnt = new YunpianClient("9391569295ef19c147b8447633d40aba").init();
//
//            DriverInfo saveCode = new DriverInfo();
//            //发送短信API
//            Map<String, String> param = clnt.newParam(2);
//            param.put(YunpianClient.MOBILE, phone);
//            String code = getNonce_str();
//
//            SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            String now = tempDate.format(new java.util.Date());
//            //入库
//            saveCode.setCode(code);
//            saveCode.setCodeTime(now);
//            driverInfoMapper.insertCode(saveCode);
//
//            param.put(YunpianClient.TEXT, "【智慧物流】您的验证码是"+code);
//            Result<SmsSingleSend> r = clnt.sms().single_send(param);
//            //获取返回结果，返回码:r.getCode(),返回码描述:r.getMsg(),API结果:r.getData(),其他说明:r.getDetail(),调用异常:r.getThrowable()
//            //账户:clnt.user().* 签名:clnt.sign().* 模版:clnt.tpl().* 短信:clnt.sms().* 语音:clnt.voice().* 流量:clnt.flow().* 隐私通话:clnt.call().*
//            //释放clnt
//            clnt.close();
//            return "2";
//        }
//        return "1";
//    }
//
//
//    /**
//     * @Description:验证验证码
//     * @Param: [siteManagerInfo]验证码和电话
//     * @return: com.mjmju.zj.transport_manage.entity.SiteManagerInfo
//     * @Author: 郑军
//     * @Date: 2020/2/5
//     */
//    public SiteManagerInfo checkManagerCode(SiteManagerInfo siteManagerInfo){
//
//        SiteManagerInfo siteManagerInfo1 = managerMapper.checkCode(siteManagerInfo);
//        if (siteManagerInfo1 != null){
//            //获取5分钟前时间
//            Calendar beforeTime = Calendar.getInstance();
//            beforeTime.add(Calendar.MINUTE, -5);// 5分钟之前的时间
//            Date beforeD = beforeTime.getTime();
//
//            SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            try {
//                Date codeTime = format.parse(siteManagerInfo1.getCodeTime());
//                if (beforeD.before(codeTime))//5分钟前时间小于数据库时间
//                {
//                    siteManagerInfo1.setPassword("");
//                    siteManagerInfo1.status1 = 1;//1验证成功 2验证码失效 3验证码错误或其他
//                    return siteManagerInfo1;
//                }else{
//                    siteManagerInfo1.status1 = 2;
//                }
//            } catch (ParseException e) {
//                System.out.println("时间转换格式错误");
//            }
//        }else {
//            siteManagerInfo1.status1 = 0;
//        }
//        return siteManagerInfo1;
//    }
//
//
//    /**
//     * @Description:检查验证码
//     * @Param: [driverInfo] 验证码及验证码时间
//     * @return: com.mjmju.zj.transport_manage.entity.DriverInfo
//     * @Author: 郑军
//     * @Date: 2020/2/5
//     */
//    public DriverInfo checkDriverCode(DriverInfo driverInfo){
//
//        DriverInfo driverInfo1 = driverInfoMapper.checkCode(driverInfo);
//        if (driverInfo1 != null){
//            //获取5分钟前时间
//            Calendar beforeTime = Calendar.getInstance();
//            beforeTime.add(Calendar.MINUTE, -5);// 5分钟之前的时间
//            Date beforeD = beforeTime.getTime();
//
//            SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            try {
//                Date codeTime = format.parse(driverInfo1.getCodeTime());
//                if (beforeD.before(codeTime))//5分钟前时间小于数据库时间
//                {
//                    driverInfo1.setPassword("");
//                    driverInfo1.status1 = 1;//1验证成功 2验证码失效 3验证码错误或其他
//                    return driverInfo1;
//                }else{
//                    driverInfo1.status1 = 2;
//                }
//            } catch (ParseException e) {
//                System.out.println("时间转换格式错误");
//            }
//
//
//        }else {
//            driverInfo1.status1 = 0;
//        }
//        return driverInfo1;
//    }
//
//
//
//
//
//    private static final String SYMBOLS = "0123456789"; // 数字
//    private static final Random RANDOM = new SecureRandom();
//    public String getNonce_str() {
//        // 如果需要4位，那 new char[4] 即可，其他位数同理可得
//        char[] nonceChars = new char[4];
//
//        for (int index = 0; index < nonceChars.length; ++index) {
//            nonceChars[index] = SYMBOLS.charAt(RANDOM.nextInt(SYMBOLS.length()));
//        }
//
//        return new String(nonceChars);
//    }


}
