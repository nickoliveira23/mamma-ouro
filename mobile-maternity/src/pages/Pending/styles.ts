import { StyleSheet, Dimensions } from 'react-native';

import Constants from 'expo-constants';


export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FF",
    flex: 1,
    paddingTop: Constants.statusBarHeight + 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  viewTitle: {
    marginLeft: 10,
    marginBottom: 10
  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  logoutIcon: {
    margin: 0,
  },

  viewButtonSaved: {
    height: 40,
    marginHorizontal: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#C3C3C5",
    marginBottom: 20,
    // backgroundColor: '#FFF',
    justifyContent: 'center'
  },

  buttonSaved: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  bookmarkIcon: {
    marginLeft: 10,
  },

  textSaved: {
    fontSize: 15,
    marginTop: 2,
    color: '#737380',

  },

  ArrowRightIcon: {
    marginRight: 10
  },

  textWaiting: {
    fontWeight: 'bold',
    color: '#737380',
    textAlign: 'center',
    marginTop: "50%"
  },

  viewFlatList: {
    flex: 1,
    paddingHorizontal: 24,

  },

  hospitals: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 20
  },


  hospitalProperty: {
    fontSize: 14,
    color: '#41414D',
    fontWeight: 'bold',
  },

  hospitalValue: {
    fontSize: 15,
    color: '#737380',
    marginTop: 8,
    marginBottom: 24
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonText: {
    color: "#A1E1D8",
    fontWeight: 'bold'
  },
})

export default styles;