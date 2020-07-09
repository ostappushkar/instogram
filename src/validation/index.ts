import * as Yup from 'yup';
class Validator {
  public static login = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Minimum 6 symbols')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain uppercase letters, lowercase letters and special symbols',
      ),
  });
  public static signup = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Reqiured')
      .min(6, 'Minimum 6 symbols')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password must contain uppercase letters, lowercase letters and special symbols',
      ),
  });
}
export default Validator;
