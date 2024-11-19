import secondsToHMS from './secToHMS.js';

export default function remainingTime(exp: number) {
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > exp) {
    throw new Error('expired Token');
  } else {
    // NOTE 남은 시간(초단위)
    const timeRemaining = exp - currentTime;
    console.log('🚀 ~ remainingTime ~ timeRemaining:', timeRemaining);
    console.log('🚀 ~ remainingTime ~ secondsToHMS(timeRemaining):', secondsToHMS(timeRemaining));

    return timeRemaining;
  }
}
