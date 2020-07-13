import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    padding: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#00000000',
    justifyContent: 'space-between',
    padding: 25,
  },
  inputItem: {
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 10,
    borderColor: 'black',
  },
  input: {
    color: 'black',
    paddingLeft: 15,
  },
  inputError: {
    color: 'red',
    paddingLeft: 15,
  },
  tabLeft: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#fff',

    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  tabRight: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#fff',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  tabActive: {
    borderColor: '#e7200d',
    backgroundColor: '#e7200d',
  },
  illustration: {
    flex: 1,
    marginTop: -30,
    resizeMode: 'contain',
    width: width,
    height: height,

    alignSelf: 'center',
  },
  backImage: {marginTop: -40},
  logo: {
    width: 200,
    height: 70,
    alignSelf: 'flex-start',
    marginTop: 120 * 0.9,
    marginLeft: 15,
    marginBottom: 20,
  },
  tabHeader: {
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 32,
    marginBottom: 50,
    lineHeight: 40,
  },
  submit: {
    height: 42,
    backgroundColor: 'transparent',
    marginTop: 10,
    elevation: 5,
    color: '#e7200d',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonGradient: {
    height: 42,
    shadowColor: '#e7200d',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 25,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    marginTop: 10,
    borderRadius: 20,
  },
  googleLogo: {
    width: 18,
    height: 18,
  },
  error: {
    color: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    marginTop: 2,
    marginLeft: 5,
  },
});
