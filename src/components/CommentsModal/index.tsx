import React from 'react';
//import Modal from 'react-native-modal';
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Icon,
  View,
} from 'native-base';
import {TouchableOpacity, Modal} from 'react-native';
const CommentsModal = ({open, setOpen, item}) => {
  let comments = item.comments;
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      transparent
      visible={open}>
      <View
        style={{
          flex: 1,
          margin: 20,
          elevation: 25,
          backgroundColor: '#fff',
          borderRadius: 25,
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: '#fa5a2e',
              fontSize: 20,
              marginLeft: 10,
              marginTop: 10,
            }}>
            Comments.
          </Text>
          <List>
            {comments.map((comment, index) => {
              return (
                <ListItem key={index} avatar>
                  <Left>
                    <Icon type="AntDesign" name="message1" />
                  </Left>
                  <Body>
                    <Text>{comment.user}</Text>
                    <Text note>{comment.comment}</Text>
                  </Body>
                  <Right>
                    <Text note>{comment.date}</Text>
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpen(false);
          }}
          style={{
            backgroundColor: '#E8ECF2',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            padding: 10,
            alignItems: 'center',
          }}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default CommentsModal;
