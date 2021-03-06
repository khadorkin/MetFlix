import React, {Suspense} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {View, TouchableOpacity, StyleSheet, ActivityIndicator, Platform} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import {useRessource} from "~/hooks/use-ressource";
import {WIDTH} from "~/utils/dimensions";


function FamilyItem({movie, navigation}: {
    movie: MovieType; navigation: NavigationScreenProp<any>;
}) {

    const {
        original_title,
        poster_path,
        overview,
    } = movie;

    //Get the poster_image of the current item
    const poster_image: string = useRessource({path: poster_path, size: 'w342'});

    // Use React Lazy loading to load images : usefull for slow network and big ressources sized
    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));


    // @ts-ignore
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7}
                              onPress={() => navigation.navigate('detail', {'movie': movie})}
                              style={styles.imageWrapper}>

                <Suspense fallback={
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator
                            color={Colors.white}
                            style={{marginVertical: Platform.OS === 'ios' ? 10 : 0}}
                            size={Platform.OS === 'ios' ? 1 : 24}
                        />
                    </View>
                }>
                    <LazyImage image={poster_image} style={styles.image} width={(WIDTH / 3) + 5} height={1}/>
                </Suspense>
                <LinearGradient
                    locations={[0.1, 0.1, 1]}
                    colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
                    >
                        {original_title}
                    </Text>
                    <Text small numberOfLines={2}
                          style={{fontWeight: '400', color: Colors.white}}>
                        {overview}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: (WIDTH / 3) + 5,
        height: 250, marginTop: 10,
    },

    imageWrapper: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'orange',
        position: 'relative',
    },
    image: {
        flex: 1,
        resizeMode: "stretch"
    },
    detailsWraper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.lightgray,
    },
});

export default withNavigation(FamilyItem);
