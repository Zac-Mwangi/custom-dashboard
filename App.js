import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import SortableGridview from 'react-native-sortable-gridview';

const App = () => {
  const [data, setData] = useState([
    {name: 'Widget 1', backgroundColor: '#f60', color: '#fff'},
    {name: 'Widget 2', backgroundColor: '#333', color: '#fff'},
    {
      name: 'Widget 3',
      backgroundColor: '#rgba(255, 216, 58, 1)',
      color: '#333',
    },
  ]);
  const [newId, setNewId] = useState(4);

  let lockData = [];
  if (data.length < 50) {
    lockData.push({
      name: 'Add Widget',
    });
  }

  const onDragRelease = updatedData => {
    console.log('Default onDragRelease', updatedData);
    setData(updatedData);
  };

  const renderItem = (item, index) => {
    return (
      <View
        uniqueKey={item.name}
        onTap={() => {
          Alert.alert(`On Tap ${item.name}!`);
        }}
        style={[styles.item, {backgroundColor: item.backgroundColor}]}>
        <Text style={[styles.text, {color: item.color}]}>{item.name}</Text>
      </View>
    );
  };

  const renderItemCover = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          let updatedData = [...data];
          updatedData.splice(index, 1);
          setData(updatedData);
        }}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderLockItem = (item, index) => {
    return (
      <View
        uniqueKey={`${item.name}`}
        style={styles.lockItem}
        onTap={() => {
          Alert.alert('Add Widget?', 'Click Yes to append Widget', [
            {text: 'Cancel'},
            {
              text: 'OK',
              onPress: () => {
                let updatedData = [...data];
                const randomColor = `#rgba(${Math.round(
                  Math.random() * 255,
                )}, ${Math.round(Math.random() * 255)}, ${Math.round(
                  Math.random() * 255,
                )}, 1)`;
                updatedData.push({
                  name: `Widget ${newId}`,
                  backgroundColor: randomColor,
                  color: '#fff',
                });
                setData(updatedData);
                setNewId(newId + 1);
              },
            },
          ]);
        }}>
        <Text style={styles.add}>{item.name}＋</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>You can add up to 6 boxes</Text>
      <SortableGridview
        data={data}
        lockData={lockData}
        onDragStart={() => {
          console.log('Default onDragStart');
        }}
        onDragRelease={onDragRelease}
        renderItem={renderItem}
        itemCoverStyle={{marginTop: -8, marginLeft: -8}}
        renderItemCover={renderItemCover}
        renderLockItem={renderLockItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  item: {
    borderRadius: 4,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#09f',
  },
  delete: {
    padding: 4,
    backgroundColor: 'red',
  },
  deleteText: {
    color: '#fff',
  },
  lockItem: {
    borderRadius: 4,
    backgroundColor: '#aaa',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    fontSize: 18,
  },
});

export default App;
