import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.3;

const FavoriteScreen = () => {
  const [favoriteDoaList, setFavoriteDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteDoa = async () => {
      try {
        const response = await axios.get('https://doa-doa-api-ahmadramadhan.fly.dev/api');
        // Limit to the first 10 items
        setFavoriteDoaList(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteDoa();
  }, []);

  const handleDoaPress = (doa) => {
    navigation.navigate('DetailDoa', { doa });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: 'https://cdn.pixabay.com/photo/2022/06/04/18/52/mosque-7242588_960_720.jpg' }}
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(45, 106, 79, 0.5)', 'rgba(27, 67, 50, 0.9)']}
            style={styles.gradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Favorite Doa</Text>
              <Text style={styles.headerSubtitle}>Doa yang Anda Simpan</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <FlatList
          data={favoriteDoaList}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDoaPress(item)} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.doa}</Text>
                <Text style={styles.cardArabic}>{item.ayat}</Text>
              </View>
              <FontAwesome name="chevron-right" size={20} color="#B7C9B5" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B4332',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B7C9B5',
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#1B4332',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 20,
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D6A4F',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardArabic: {
    fontSize: 16,
    color: '#B7C9B5',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'System',
  },
});

export default FavoriteScreen;
