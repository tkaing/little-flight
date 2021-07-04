import React, { Component } from 'react';
import SliderEntry from './HomeCarousel/SliderEntry';
import styles, { colors } from './HomeCarousel/slider.style';
import { ENTRIES1 } from './HomeCarousel/entries';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './HomeCarousel/SliderEntry.style';
import { View, Text, ScrollView, StatusBar } from 'react-native'
import { translate } from "../locale/local"

const SLIDER_1_FIRST_ITEM = 1;

export class HomeCarousel extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              justifyContent: 'center',
              padding: 50,
              marginLeft: 25,
              marginTop: 50,
              marginRight: 25, }}>
            <Text style={{fontSize: 30}}>la</Text>
            <Text>ici</Text>
          </View>

        )
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {

        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    mainExample (number, title) {

        const { slider1ActiveSlide } = this.state;

        return (
            <View style={[ styles.exampleContainer ]}>
                <Text style={[ styles.title ]}>{`Little Flight`}</Text>
                <Text style={[ styles.subtitle ]}>{ title }</Text>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.gray}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }


    render () {

        const example1 = this.mainExample(1, translate("HOME_DRONE_CONNECT"));

        return (
                <View style={[ styles.container ]}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={[ styles.scrollview ]}
                      scrollEventThrottle={ 200 }
                      directionalLockEnabled={ true }
                    >
                        { example1 }
                    </ScrollView>
                </View>
        );
    }
}

export default HomeCarousel
