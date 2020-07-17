import React from 'react';
import {ListItem, Text, Icon, Layout} from '@ui-kitten/components';
const Comment = ({item}) => {
  return (
    <ListItem
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 8,
      }}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        <Text style={{fontWeight: 'bold'}}>{item.user}</Text>
        <Text appearance="hint">{item.date}</Text>
      </Layout>
      <Text>{item.comment}</Text>
    </ListItem>
  );
};
export default Comment;
