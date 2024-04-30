import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import useRpc from '../hooks/use-rpc'

export default function App () {
  const [value, setValue] = useState('')
  const { room, messages, createRoom } = useRpc()

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Button
          title="Create chat room"
          onPress={async () => {
            try {
              setName('hello')
              // await createRoom('foo')
              console.log('room created...')
            } catch (err) {
              console.log(err)
            }
          }}
        />
        <Text style={styles.text}>- or -</Text>
        <Text style={styles.text}>{messages.join('\n')}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Public key for chat room"
        />
        <Button
          title="Join chat room"
          onPress={async () => {
            // await joinRoom()
            console.log('room joined...')
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  text: {
    fontSize: 16
  },
  input: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff'
  }
})
