const MESSAGES = Object.freeze({
  // FIXME 에러 코드가 아니라 에러 상황에 대해 메세지를 작성해야함. 커스텀 에러 타입이 완성되면 해당 타입으로 에러 코드를 나타내고, 상황에 맞는 메세지로 변경해주세요.
  BAD_REQUEST: '클라이언트 오류로 인해 서버가 요청을 처리할 수 없습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  INTERNAL_ERROR: '서버 내부 오류가 발생했습니다.',
  FORBIDDEN: '토큰이 유효하지 않습니다.',
  NOT_FOUND: '찾을 수 없는 리소스입니다.',

  WRONG_ID_FORMAT: 'ID 형식이 잘못되었습니다.',
  WRONG_EMAIL_FORMAT: 'Email 형식이 잘못되었습니다.',
  WRONG_FORMAT: '데이터 형식이 잘못되었습니다.',
  NO_REFRESH_TOKEN: '리프레시 토큰이 없습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 잘못되었습니다.',
  MISSING_FIELDS: '필수 입력 값이 누락되었습니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  INVALID_ACCESS_TOKEN: '유효하지 않은 엑세스 토큰입니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  NO_ENV_VARIABLE: '필요한 환경변수가 지정되지 않았습니다.',
});

export default MESSAGES;
