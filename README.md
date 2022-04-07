# office-node {{OFFODE}} {This is POC of how an attacker automate user's responce and bypass outlook}
This project will give you understanding of bypassing Multi Factor Authentication (MFA) of your outlook accoutnt. It is build in nod.js and it use playwright for the autmation in backend.
<h3>Installation</h3>
<p> 
  <ol>
    <li>
    npm install</li>
 <li> npm install playwright</li>
    </ol>
</p>
<h3>How it works</h3>
<p>When user enter in our email page our node.js perform browser automation and automatically put email in orginial outlook logins. Then check the response of original server and show it to user.
And then user enter further details and so on server again automate it.</p>
<h3>Case Studies</h3>
Since this project shows saved pages with alittle changing to user, It requires alot of back and forth monitoring and management. (Since microsoft sometime changes the pages so this project needes some changing accordingly).
We tried to cover all basic case studies which includes.
<h4>Case1: Basic Email & Password</h4>
![Case 1](https://user-images.githubusercontent.com/83189731/162149608-64f02fac-ac49-48f5-9f2b-0f4846438d21.gif)
<h4>Case2: Authenticator OTP</h4>
![Case 2 authenticator pass](https://user-images.githubusercontent.com/83189731/162149690-290de90a-5ad6-43ff-b35e-9c12f762a0e3.gif)
<h4>Case3: Phone Number OTP</h4>
![Cas3 OTP message](https://user-images.githubusercontent.com/83189731/162149841-7d90a34b-5073-4aa5-8f03-6156cfb8f86e.gif)
