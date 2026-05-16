import qrcode
import tkinter as tk
from tkinter import messagebox
import os

def generar():
    contenido = entry_url.get()
    nombre = entry_nombre.get()
    
    if not contenido or not nombre:
        messagebox.showwarning("Error", "Por favor, rellena todos los campos.")
        return

    try:
        # 1. Generar el QR
        img = qrcode.make(contenido)

        # 2. Obtener la ruta de la carpeta de Descargas (Downloads) de forma segura
        # 'USERPROFILE' funciona en Windows. 
        descargas = os.path.join(os.path.expanduser('~'), 'Downloads')
        
        # 3. Construir la ruta completa con el nombre que puso el usuario
        ruta_final = os.path.join(descargas, f"{nombre}.png")

        # 4. Guardar la imagen
        img.save(ruta_final)

        # 5. Avisar al usuario SOLO después de guardar con éxito
        messagebox.showinfo("Éxito", f"QR guardado en Descargas como:\n{nombre}.png")
        
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo guardar el archivo: {e}")

# --- Configuración de la Ventana ---
ventana = tk.Tk()
ventana.title("QR Generator")
ventana.geometry("350x250")

tk.Label(ventana, text="URL o Texto:", font=("Arial", 10, "bold")).pack(pady=5)
entry_url = tk.Entry(ventana, width=40)
entry_url.pack(pady=5)

tk.Label(ventana, text="Nombre del archivo (sin extensión):", font=("Arial", 10, "bold")).pack(pady=5)
entry_nombre = tk.Entry(ventana, width=40)
entry_nombre.pack(pady=5)

# Botón con el color café de KOA Project
tk.Button(ventana, text="Generar y Guardar en Descargas", command=generar, bg="#d2b48c", fg="black", padx=10, pady=10).pack(pady=20)

ventana.mainloop()