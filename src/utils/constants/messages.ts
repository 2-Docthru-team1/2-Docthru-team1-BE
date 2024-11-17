const MESSAGES = Object.freeze({
  WRONG_ID_FORMAT: 'ID 형식이 잘못되었습니다.',
  WRONG_EMAIL_FORMAT: 'Email 형식이 잘못되었습니다.',
  WRONG_FORMAT: '데이터 형식이 잘못되었습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 잘못되었습니다.', // 로그인 실패
  MISSING_FIELDS: '필수 입력 값이 누락되었습니다.',
  UNAUTHORIZED: '권한이 없습니다.', // 인증 실패
  INTERNAL_ERROR: '서버 내부 오류가 발생했습니다.',
});

export default MESSAGES;
