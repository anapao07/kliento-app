import React from 'react'
import { StyleSheet, View, ImageBackground, Image, FlatList} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, Block, Ripple } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {Query} from 'react-apollo';
import gql from 'graphql-tag' ;


const GET_SURVEY = gql`
query MyQuery {
  data_assignment {
    survey
    user
  }
}
`;



const AllSurvey = () => (
  <Query query={GET_SURVEY}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading</Text>
      if (error) return <Text>{error.message}</Text>

      return (
        <>
          {/*<Text>{JSON.stringify(data)}</Text>*/}
        {data.data_survey.map(inv => (
          <Text>{inv.name}</Text>
          ))}
        </>
      );
    }}
  </Query>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:{}
    }
  }






  

  // renderSurveys = ({item}) =>{
  //   const {language, languageCode, accounts} = this.props;
  //   let color = item.results ? Theme.colors.green : Theme.colors.black;
  //   return(
  //     <Ripple
  //       style={[appStyles.listItem, {margin:0}]}
  //       onPress={() => { this.props.navigation.navigate(Screens.Settings.route, {id:item.id}) }}
  //       >
  //       <Block row center space="around">
  //         <Block row flex={1} left>
  //           <View style={[
  //             appStyles.catIcon,
  //             appStyles.catIconMid,
  //             {backgroundColor: iconBills[item.type].color, marginHorizontal: Theme.sizes.indenthalf}
  //             ]}
  //             >
  //             <Icon name={item.type} size={Theme.sizes.title}/>
  //           </View>
  //         </Block>
  //         <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
  //           <Text numberOfLines={1}>{item.name}</Text>
  //           <Text small gray>{language[item.type]} - {language[cycle[item.cyc]]}</Text>
  //         </Block>
  //         <Block column flex={1.4} right>
  //           <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
  //           {
  //             (item.cyc==1 || item.cyc==7) ?
  //             <Text gray small>{language[cycle[item.cyc]]}</Text> :
  //             <Text gray small>{language.dueDate} : {formatDate({lang:languageCode, date:item.date, format:'dateShort'})}</Text>
  //           }
  //         </Block>
  //       </Block>
  //     </Ripple>
  //     );
  // }

  noItemDisplay = () => {
    const {language} = this.props;
    return (
        <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language.noSurveys}</Text></Block>
      );
  };
  
  render(){
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          <AllSurvey>  </AllSurvey>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);