import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

import {priceDisplay} from '../util'
import ajax from '../ajax';

class DealDetail extends React.Component {
    static propTypes = {
      initialDealData: PropTypes.object.isRequired,
      onBack: PropTypes.func.isRequired
    }
    state = {
      deal: this.props.initialDealData,
    };
    async componentDidMount(){
      const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
      this.setState({
        deal: fullDeal,
      });
    }
    render() {
        const { deal } = this.state
        return (
         <View style={styles.deal}>
          <TouchableOpacity style={styles.backButton} onPress={this.props.onBack}>
            <Text>Back</Text>
          </TouchableOpacity>
            <Image style={styles.image} source={{ uri: deal.media[0] }} />
            <View style={styles.info}>
              <Text style={styles.title}>{deal.title}</Text>
              <View style={styles.footer}>
                <Text style={styles.cause}>{deal.cause.name}</Text>
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              </View>
            </View>
            {deal.user && (
            <View style={styles.user}>
              <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
            )}
            <View>
              <Text style={styles.description}>{deal.description}</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  deal: {
  marginHorizontal: 12,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    alignItems: 'center',
  },
  detail: {
    borderColor: '#bbb',
    borderWidth: 1,
    marginBottom: 50,
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  user: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    width: 60,
    height: 60,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
  backButton: {
    marginBottom: 8,
    color: '#22f',
    marginLeft: 12,
  },
  });

export default DealDetail