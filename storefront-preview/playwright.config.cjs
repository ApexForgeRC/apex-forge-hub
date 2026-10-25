const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
  testDir:__dirname,
  testMatch:'browser.spec.cjs',
  use:{baseURL:'http://127.0.0.1:4178',browserName:'chromium'},
  webServer:{command:'node server.cjs',cwd:__dirname,url:'http://127.0.0.1:4178',reuseExistingServer:!process.env.CI},
  projects:[
    {name:'desktop',use:{viewport:{width:1440,height:1000}}},
    {name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  ],
});
