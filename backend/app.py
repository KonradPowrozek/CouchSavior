from flask import Flask, request
from flask_socketio import SocketIO
import pyautogui
import logging

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MAX_X = 1920
MAX_Y = 1080

def validate_coordinates(data):
    if not all(k in data for k in ('x', 'y')):
        return False
    try:
        x = int(data['x'])
        y = int(data['y'])
        return 0 <= x <= MAX_X and 0 <= y <= MAX_Y
    except Exception:
        return False

@socketio.on('move_mouse')
def handle_move_mouse(data):
    logger.info(f"move_mouse: {data}")
    if not validate_coordinates(data):
        logger.warning(f"Nieprawidłowe współrzędne: {data}")
        return
    try:
        pyautogui.moveTo(
            x=data['x'],
            y=data['y'],
            duration=0.05,
            tween=pyautogui.easeOutQuad
        )
    except Exception as e:
        logger.error(f"Błąd ruchu myszy: {e}")

@socketio.on('click_mouse')
def handle_click_mouse(data=None):
    logger.info("Wykonano kliknięcie")
    try:
        pyautogui.click()
    except Exception as e:
        logger.error(f"Błąd kliknięcia: {e}")

@socketio.on('connect')
def handle_connect(auth=None):
    logger.info(f"Połączono klienta: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    logger.info(f"Rozłączono klienta: {request.sid}")

if __name__ == '__main__':
    pyautogui.FAILSAFE = True
    pyautogui.PAUSE = 0.01
    logger.info("Uruchamianie serwera na porcie 5000")
    socketio.run(
        app,
        host='0.0.0.0',
        port=5000,
        allow_unsafe_werkzeug=True
    )
