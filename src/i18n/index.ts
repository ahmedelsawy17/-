import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      home: 'الرئيسية',
      courses: 'الكورسات',
      videos: 'فيديوهات ثالثة',
      contact: 'تواصل معنا',
      login: 'تسجيل دخول',
      signup: 'إنشاء حساب',
      logout: 'تسجيل خروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      language: 'English',
      submit: 'دخول',
      switchAuth: 'ليس لديك حساب؟ أنشئ حساب',
      switchAuth2: 'لديك حساب بالفعل؟ تسجيل دخول',
      welcome: 'مرحبًا',
    },
  },
  en: {
    translation: {
      home: 'Home',
      courses: 'Courses',
      videos: 'Third-year Videos',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      fullName: 'Full name',
      language: 'العربية',
      submit: 'Continue',
      switchAuth: "Don't have an account? Sign up",
      switchAuth2: 'Already have an account? Login',
      welcome: 'Welcome',
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
});

export default i18n;
