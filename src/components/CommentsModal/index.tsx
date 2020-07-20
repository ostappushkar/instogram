import React from 'react';
import {Modal, FlatList, ListRenderItem, ScrollView} from 'react-native';
import {useTheme, Button, Divider, Text, Layout} from '@ui-kitten/components';
import Comment from '../Comment';
import {IComment} from 'src/interfaces/post';
import {ThemeContext} from '../../../theme-context';
const CommentsModal = ({open, setOpen, item}) => {
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const renderItem: ListRenderItem<IComment> = ({item}) => {
    return <Comment item={item} />;
  };
  return (
    <Modal animationType="slide" transparent visible={open}>
      <Layout
        style={{
          flex: 1,
          backgroundColor:
            themeContext.theme === 'light'
              ? theme['color-basic-100']
              : theme['color-basic-800'],
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <Layout>
          <Text
            style={{
              color: theme['color-primary-default'],
              fontSize: 24,
              fontWeight: 'bold',
              marginLeft: 5,
              marginTop: 10,
            }}>
            Comments.
          </Text>
          <ScrollView>
            <FlatList
              ItemSeparatorComponent={Divider}
              data={item.comments}
              renderItem={renderItem}
              initialNumToRender={10}
            />
          </ScrollView>
        </Layout>
        <Button
          onPress={() => {
            setOpen(false);
          }}>
          Close
        </Button>
      </Layout>
    </Modal>
  );
};
export default CommentsModal;
