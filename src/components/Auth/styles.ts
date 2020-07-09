import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#7558F3',
  },
  content: {
    flex: 1,
    backgroundColor: '#7558F3',
    justifyContent: 'flex-start',
    padding: 25,
  },
  inputItem: {
    shadowColor: '#6149c9',
    elevation: 3,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 25,
    backgroundColor: '#6149c9',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    borderColor: 'transparent',
  },
  input: {
    color: 'white',
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
    borderColor: '#6149c9',
    backgroundColor: '#6149c9',
  },
  illustration: {
    resizeMode: 'contain',
    width: width - 150,
    height: 200,
    alignSelf: 'center',
  },
  backImage: {resizeMode: 'contain'},
  logo: {
    width: 200,
    height: 70,
    alignSelf: 'center',
    margin: 110,
    marginTop: 100,
  },
  tabHeader: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 32,
    marginBottom: 10,
    lineHeight: 40,
  },
  submit: {
    backgroundColor: 'white',
    marginTop: 10,
    color: '#6149c9',
    shadowColor: '#6149c9',
    elevation: 5,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 25,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 15,
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
    color: '#fff',
    marginTop: -10,
    marginBottom: 10,
  },
});
