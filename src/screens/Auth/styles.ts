import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 0,
    flex: 1,
  },
  scroll: {
    width: width,
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingBottom: 0,
    paddingRight: 20,
    paddingTop: 0,
  },
  input: {marginTop: 10},
  content: {
    flex: 1,
    backgroundColor: '#00000000',
    justifyContent: 'space-between',
    padding: 25,
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
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 20,
  },
  tabHeader: {
    fontWeight: 'bold',
    color: '#598BFF',
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
    marginTop: 20,
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
    marginBottom: 10,
  },
});
