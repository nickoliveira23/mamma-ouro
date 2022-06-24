import { StyleSheet, Dimensions } from 'react-native';

import Constants from 'expo-constants';


export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FF",
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  viewTitle: {
    marginLeft: 10,
    marginBottom: 10
  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewFlatList: {
    flex: 1,
  },

  schedule: {
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
  }


})

export default styles;