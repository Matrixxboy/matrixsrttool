import sys
import os
import socket
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router

# --------------------------------------------------------------------------
# 1. STRICT PYTHON VERSION CHECK
# --------------------------------------------------------------------------
REQUIRED_VERSION = (3, 12)

if sys.version_info[:2] != REQUIRED_VERSION:
    print("\n" + "="*50)
    print("❌ Unsupported Python version detected.")
    print(f"   Current: {sys.version.split()[0]}")
    print(f"   Required: {'.'.join(map(str, REQUIRED_VERSION))}.*")
    print("   The server will not start.")
    print("="*50 + "\n")
    sys.exit(1)

# --------------------------------------------------------------------------
# 2. APP SETUP
# --------------------------------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}

# --------------------------------------------------------------------------
# 3. AUTOMATIC PORT SELECTION
# --------------------------------------------------------------------------
def find_available_port(start_port: int = 8000, max_port: int = 8100) -> int:
    """Try to bind to a port to check availability."""
    for port in range(start_port, max_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                print(f"⚠️ Port {port} is in use")
                continue
    raise RuntimeError("No free ports found in range")

# --------------------------------------------------------------------------
# 4. SERVER STARTUP
# --------------------------------------------------------------------------
if __name__ == "__main__":
    try:
        # Find a free port
        port = find_available_port()
        print(f"\n✅ Server starting on port {port}...")
        print(f"✅ Python Version: {sys.version.split()[0]}")
        
        # Write Port to Client .env
        client_env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Client", ".env")
        try:
            with open(client_env_path, "w") as f:
                f.write(f"VITE_API_URL=http://127.0.0.1:{port}\n")
            print(f"✅ Updated Client config: {client_env_path}")
        except Exception as e:
             print(f"⚠️ Failed to update Client .env: {e}")

        print("✅ Press Ctrl+C to stop the server (Ports will be released)\n")
        
        # Start Server
        uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
        
    except KeyboardInterrupt:
        print("\n🛑 Server shutting down...")
    except Exception as e:
        print(f"\n❌ Server failed to start: {e}")

