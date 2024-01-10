import React from 'react';
import {Dimensions, FlatList, View, Text, Image} from 'react-native';
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer,
} from '@n1ru4l/react-in-center-of-screen';
import Video from 'react-native-video';
import {Colors} from '../../Constant/Colors';
import Icon from 'react-native-vector-icons/FontAwesome6';

const {height: windowHeight} = Dimensions.get('window');

const boxHeight = windowHeight / 3;

export default function AutoVideo() {
  const data = [
    {type: 'image', src: require('../../Assets/Images/Image-8.png')},
    {type: 'video', src: require('../../Assets/Videos/Groove-logo.mp4')},
    {type: 'image', src: require('../../Assets/Images/Image-12.png')},
    {type: 'video', src: require('../../Assets/Videos/Groove-logo.mp4')},
    {type: 'image', src: require('../../Assets/Images/Image-15.png')},
    {type: 'video', src: require('../../Assets/Videos/Groove-logo.mp4')},
  ];
  return (
    <OffsetYProvider
      columnsPerRow={1}
      listItemHeight={boxHeight}
      centerYStart={(windowHeight * 1) / 3}
      centerYEnd={(windowHeight * 2) / 3}>
      {({setOffsetY}) => (
        <FlatList
          data={data}
          contentContainerStyle={{
            backgroundColor: Colors.black,
            marginBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={ev => {
            setOffsetY(ev.nativeEvent.contentOffset.y);
          }}
          keyExtractor={(item, index) => index}
          renderItem={({index, item}) => (
            <IndexProvider index={index}>
              {() => (
                <View
                  style={{
                    height: boxHeight,
                    marginVertical: 20,
                  }}>
                  {item.type == 'image' ? (
                    <Image
                      source={item.src}
                      style={{width: '100%', height: '100%'}}
                    />
                  ) : (
                    <InCenterConsumer>
                      {({isInCenter}) =>
                        isInCenter ? (
                          <Video
                            paused={false}
                            source={item.src}
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: Colors.black,
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <View
                            style={{
                              width: '100%',
                              height: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: Colors.black,
                            }}>
                            <Icon
                              name="circle-play"
                              size={30}
                              color={Colors.green}
                            />
                            <Video
                              paused={true}
                              source={item.src}
                              style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        )
                      }
                    </InCenterConsumer>
                  )}
                </View>
              )}
            </IndexProvider>
          )}
        />
      )}
    </OffsetYProvider>
  );
}
