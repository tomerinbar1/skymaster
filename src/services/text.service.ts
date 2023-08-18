import { TextService } from '../interfaces/interfaces'

const getText: TextService = () => {
  return {
    minAge: 'הגיל המינימלי להוצאת רישיון טיס פרטי בישראל הוא 17',
    theoryList: [
      'חוקה',
      'מטאורולוגיה',
      'נווטות',
      'ידע טכני כללי',
      'הכרת כלי הטיס - ספר פתוח',
      'הכרת כלי הטיס - ספר סגור',
      'ביצועי אנוש',
      '*רדיו טלפון',
    ],
    reqTests: ['השלב התיאורתי', 'השלב המעשי'],
    initial: ['הפקת תעודה רפואית ברמה 2', 'הוצאת רישיון סטודנט זמני'],
  }
}

export { getText }
