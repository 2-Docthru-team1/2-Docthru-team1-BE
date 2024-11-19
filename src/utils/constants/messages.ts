const MESSAGES = Object.freeze({
  WRONG_ID_FORMAT: 'ID 형식이 잘못되었습니다.',
  WRONG_EMAIL_FORMAT: 'Email 형식이 잘못되었습니다.',
  WRONG_FORMAT: '데이터 형식이 잘못되었습니다.',
});


export enum ErrorMessages {
  RECIPE_NOT_FOUND = '레시피를 찾을 수 없습니다',
  ERROR_FETCHING_RECIPES = '레시피 목록을 가져오는 중 오류가 발생했습니다',
  ERROR_FETCHING_RECIPE = '레시피를 가져오는 중 오류가 발생했습니다'
}

export default MESSAGES;
