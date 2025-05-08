# CouchSavior

**CouchSavior** to aplikacja pozwalająca sterować kursorem myszy na komputerze przy pomocy smartfona, wykorzystując do tego wirtualny touchpad oraz kliknięcia.
Projekt składa się z mobilnego frontendu (Expo/React Native) oraz backendu w Pythonie (Flask-SocketIO).
Pomysł na projekt wpadł podczas własnych odczuć podczas oglądania seriali.

---

## 📚 Spis treści

- [Opis projektu](#opis-projektu)
- [Technologie](#technologie)
- [Instalacja](#instalacja)
  - [Backend (Python)](#backend-python)
  - [Frontend (Expo/React Native)](#frontend-exporeact-native)
- [Uruchamianie](#uruchamianie)
- [Konfiguracja](#konfiguracja)
- [Zrzuty ekranu](#zrzuty-ekranu)

---

## Opis projektu

Aplikacja umożliwia zdalne sterowanie myszą komputera z poziomu telefonu.  
W skład projektu wchodzą:

- **Frontend (mobilny touchpad):**  
  Aplikacja Expo/React Native, która pozwala połączyć się z komputerem, przesuwać kursor oraz klikać myszą za pomocą dotyku na ekranie smartfona.

- **Backend (serwer Python):**  
  Serwer Flask-SocketIO, który odbiera polecenia z aplikacji mobilnej i wykonuje ruchy myszą oraz kliknięcia na komputerze przy użyciu biblioteki pyautogui.

---

## Technologie

- **Frontend:**
  - React Native (Expo)
  - socket.io-client
  - JavaScript/TypeScript

- **Backend:**
  - Python 3
  - Flask
  - Flask-SocketIO
  - pyautogui

- **Inne:**
  - Git, GitHub

---
## Instalacja

### Backend (Python)

1. Przejdź do folderu `backend`:
    ```
    cd backend
    ```
2. (Opcjonalnie) Utwórz i aktywuj wirtualne środowisko:
    ```
    python -m venv .venv
    # Windows:
    .venv\Scripts\activate
    # Linux/Mac:
    source .venv/bin/activate
    ```
3. Zainstaluj zależności:
    ```
    pip install flask flask-socketio pyautogui
    ```

### Frontend (Expo/React Native)

1. Przejdź do folderu `frontend`:
    ```
    cd frontend
    ```
2. Zainstaluj zależności:
    ```
    npm install
    ```
3. Jeśli nie masz Expo CLI:
    ```
    npm install -g expo-cli
    ```

---

## Uruchamianie

### Backend

W folderze `backend` uruchom:
    python app.py

Serwer nasłuchuje na porcie 5000.

### Frontend

W folderze `frontend` uruchom:
    npx expo start --tunnel

Skanuj kod QR aplikacją **Expo Go** na telefonie.

---

## Konfiguracja

- **Adres IP komputera:**  
  W aplikacji mobilnej wpisz adres IP komputera, na którym uruchomiony jest backend.
- **Port:**  
  Domyślnie 5000 (możesz zmienić w kodzie backendu).
- **Rozdzielczość ekranu:**  
  Jeśli Twój komputer ma inną rozdzielczość niż 1920x1080, zmień wartości `PC_WIDTH` i `PC_HEIGHT` w pliku touchpada na odpowiednie.

---

## Zrzuty ekranu

![image](https://github.com/user-attachments/assets/4f4e53f4-4edf-411a-9f26-5769e9bc43ae)


