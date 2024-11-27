const MESSAGES = Object.freeze({
  BAD_REQUEST: '요청이 잘못되었습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '찾을 수 없는 리소스입니다.',
  INTERNAL_ERROR: '서버 내부 오류가 발생했습니다.',
  WRONG_ID_FORMAT: 'ID 형식이 잘못되었습니다.',
  WRONG_EMAIL_FORMAT: 'Email 형식이 잘못되었습니다.',
  WRONG_FORMAT: '데이터 형식이 잘못되었습니다.',
  NO_REFRESH_TOKEN: '리프레시 토큰이 없습니다.',
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 잘못되었습니다.',
  USER_EXISTS: '이미 존재하는 이메일입니다.',
  MISSING_FIELDS: '필수 입력 값이 누락되었습니다.',
  INVALID_ACCESS_TOKEN: '유효하지 않은 엑세스 토큰입니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  WORK_NOT_FOUND: '챌린지 도전 게시물을 찾을 수 없습니다.',
  DELETED_RESOURCE: '삭제된 리소스입니다.',
  NO_ENV_VARIABLE: '필요한 환경변수가 지정되지 않았습니다.',
  ALREADY_LIKED_MESSAGE: '이미 좋아요를 눌렀습니다.',
  UNLIKE_NOT_CURRENTLY_LIKED: '좋아요를 취소할 수 없습니다. 현재 좋아요 상태가 아닙니다.',
  BAD_REQUEST_STATUS: '사용할 수 없는 status 값입니다.',
});

export default MESSAGES;
