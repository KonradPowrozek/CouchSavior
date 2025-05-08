import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, PanResponder } from 'react-native';
import { io, Socket } from 'socket.io-client';

const TOUCHPAD_SIZE = 300;
const PC_WIDTH = 1920; // Zmień na swoją rozdzielczość!
const PC_HEIGHT = 1080;

export default function TouchpadScreen() {
  const socketRef = useRef<Socket | null>(null);
  const [ip, setIp] = useState('');
  const [connected, setConnected] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: TOUCHPAD_SIZE / 2, y: TOUCHPAD_SIZE / 2 });

  // Połącz z backendem
  const connectSocket = () => {
    if (socketRef.current) socketRef.current.disconnect();
    socketRef.current = io(`http://${ip}:5000`, {
      transports: ['websocket'],
      reconnection: false,
    });
    socketRef.current.on('connect', () => {
      setConnected(true);
      console.log('Połączono z backendem!');
    });
    socketRef.current.on('disconnect', () => {
      setConnected(false);
      console.log('Rozłączono z backendem!');
    });
  };

  // Wyślij pozycję kursora
  const sendPosition = (x: number, y: number) => {
    if (!socketRef.current?.connected) return;
    const pcX = Math.round((x / TOUCHPAD_SIZE) * PC_WIDTH);
    const pcY = Math.round((y / TOUCHPAD_SIZE) * PC_HEIGHT);
    socketRef.current.emit('move_mouse', { x: pcX, y: pcY });
  };

  // Klik myszą
  const clickMouse = () => {
    if (socketRef.current && connected) {
      socketRef.current.emit('click_mouse', {});
    }
  };

  // Obsługa dotyku
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setTouchPos({ x: locationX, y: locationY });
        sendPosition(locationX, locationY);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setTouchPos({ x: locationX, y: locationY });
        sendPosition(locationX, locationY);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sterowanie komputerem</Text>
        <TextInput
          placeholder="IP komputera"
          value={ip}
          onChangeText={setIp}
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="numbers-and-punctuation"
          autoCapitalize="none"
        />
        <Button title="Połącz" onPress={connectSocket} />
        <Text style={{ color: connected ? 'green' : 'red', margin: 10 }}>
          {connected ? 'Połączono!' : 'Niepołączono'}
        </Text>
        <View
          {...panResponder.panHandlers}
          style={styles.touchpad}
          pointerEvents="box-only"
        >
          <View
            style={[
              styles.cursor,
              {
                left: touchPos.x - 10,
                top: touchPos.y - 10,
              },
            ]}
          />
        </View>
        <Button title="Kliknij" onPress={clickMouse} disabled={!connected} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  touchpad: {
    width: TOUCHPAD_SIZE,
    height: TOUCHPAD_SIZE,
    backgroundColor: '#222',
    borderRadius: 20,
    marginVertical: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cursor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
