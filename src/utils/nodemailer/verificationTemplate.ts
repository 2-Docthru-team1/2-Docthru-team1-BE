const verificationTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HanCook 이메일 인증</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>HanCook</h1>
        <p>회원가입을 환영합니다!</p>
      </div>
      <p>안녕하세요,</p>
      <p>아래 링크를 클릭하여 이메일 인증을 완료해주세요:</p>
      <a href="{{verificationLink}}">이메일 인증하기</a>
      <p>만약 버튼이 작동하지 않는다면, 아래 링크를 브라우저에 복사하여 접속하세요:</p>
      <p>{{verificationLink}}</p>
      <div class="footer">
        <p>HanCook 팀 드림</p>
      </div>
    </div>
  </body>
</html>
`;

export default verificationTemplate;
