import { LatLng } from 'react-native-maps/lib/sharedTypes'

export default interface CustomMarkerOnPress {
    (id: number, coordinates: LatLng): void
}