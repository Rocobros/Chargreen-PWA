# Importar bibliotecas necesarias
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
from scipy.stats import linregress
import os
import requests
import json
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# Obtener la ruta del directorio donde se encuentra el archivo .py
script_dir = os.path.dirname(os.path.abspath(__file__))

# Lista para almacenar los elementos a añadir en el PDF
flowables = []

def create_line_plot_with_linear_regression(x, y, name_img, x_name, y_name, name):
    plt.figure(figsize=(10, 5))  # Crear una figura de tamaño específico
    plt.plot(x, y, marker='o', label='Datos')  # Graficar los datos con marcadores
    
    # Calcular la regresión lineal
    slope, intercept, r_value, p_value, std_err = linregress(range(len(x)), y)
    reg_line = [slope * i + intercept for i in range(len(x))]  # Generar la línea de regresión
    plt.plot(x, reg_line, label=f'Regresión lineal (R²={r_value**2:.2f})')  # Graficar la línea de regresión
    
    plt.xlabel(x_name)  # Añadir la etiqueta del eje X
    plt.ylabel(y_name)  # Añadir la etiqueta del eje Y
    plt.grid(True)  # Mostrar la cuadrícula
    plt.legend()  # Mostrar la leyenda
    
    # Mostrar solo algunas etiquetas de fecha
    step = max(1, len(x) // 10)
    plt.xticks(ticks=range(0, len(x), step), labels=[x[i] for i in range(0, len(x), step)], rotation=45, ha='right')
    
    plt.tight_layout()  # Ajustar el layout para que no se corten las etiquetas
    
    plot_path = os.path.join(script_dir, name_img)  # Ruta para guardar la imagen de la gráfica
    plt.savefig(plot_path)  # Guardar la gráfica como imagen
    plt.close()  # Cerrar la figura
    return plot_path  # Devolver la ruta de la imagen guardada

def create_regression_projection_plot(x, y, name_img, x_name, y_name, name, months=3):
    plt.figure(figsize=(10, 5))  # Crear una figura de tamaño específico
    
    # Calcular la regresión lineal
    slope, intercept, r_value, p_value, std_err = linregress(range(len(x)), y)
    
    # Generar fechas para los próximos 3 meses
    last_date = datetime.strptime(x[-1], '%Y-%m-%d')
    future_dates = [last_date + timedelta(days=30 * i) for i in range(1, months + 1)]
    future_x = list(range(len(x), len(x) + months))
    future_labels = [date.strftime('%Y-%m-%d') for date in future_dates]
    
    # Generar la línea de regresión extendida
    reg_line = [slope * i + intercept for i in range(len(x) + months)]
    
    # Graficar solo la línea de regresión extendida
    plt.plot(future_x, reg_line[len(x):], label=f'Proyección de regresión lineal (R²={r_value**2:.2f})', color='orange')
    
    plt.xlabel(x_name)  # Añadir la etiqueta del eje X
    plt.ylabel(y_name)  # Añadir la etiqueta del eje Y
    plt.grid(True)  # Mostrar la cuadrícula
    plt.legend()  # Mostrar la leyenda
    
    # Mostrar solo algunas etiquetas de fecha incluyendo las futuras
    step = max(1, months // 10)
    plt.xticks(ticks=range(len(x), len(x) + months, step), labels=[future_labels[i] for i in range(0, months, step)], rotation=45, ha='right')
    
    plt.tight_layout()  # Ajustar el layout para que no se corten las etiquetas
    
    plot_path = os.path.join(script_dir, name_img)  # Ruta para guardar la imagen de la gráfica
    plt.savefig(plot_path)  # Guardar la gráfica como imagen
    plt.close()  # Cerrar la figura
    return plot_path  # Devolver la ruta de la imagen guardada

def create_line_plot(x, y, name_img, x_name, y_name, name):
    plt.figure(figsize=(10, 5))  # Crear una figura de tamaño específico
    plt.plot(x, y, marker='o', label='Datos')  # Graficar los datos con marcadores
    
    plt.xlabel(x_name)  # Añadir la etiqueta del eje X
    plt.ylabel(y_name)  # Añadir la etiqueta del eje Y
    plt.grid(True)  # Mostrar la cuadrícula
    plt.legend()  # Mostrar la leyenda
    
    plt.xticks(rotation=45, ha='right')  # Rotar las etiquetas del eje X
    plt.tight_layout()  # Ajustar el layout para que no se corten las etiquetas
    
    plot_path = os.path.join(script_dir, name_img)  # Ruta para guardar la imagen de la gráfica
    plt.savefig(plot_path)  # Guardar la gráfica como imagen
    plt.close()  # Cerrar la figura
    return plot_path  # Devolver la ruta de la imagen guardada

# Función para crear el contenido del PDF con texto y gráfica
def create_text_and_graphic_lineal(img_path, text):
    styles = getSampleStyleSheet()  # Obtener los estilos predeterminados
    paragraph = Paragraph(text, styles['Title'])  # Crear un párrafo con el texto dado
    flowables.append(paragraph)  # Añadir el párrafo a los elementos del PDF
    flowables.append(Paragraph("<br/><br/>", styles['Title']))  # Añadir saltos de línea
    
    img = Image(img_path)  # Crear un objeto de imagen con la ruta dada
    img.drawHeight = 5 * 72  # Ajustar la altura de la imagen (6 pulgadas)
    img.drawWidth = 10 * 72  # Ajustar el ancho de la imagen (8 pulgadas)
    flowables.append(img)  # Añadir la imagen a los elementos del PDF
    flowables.append(PageBreak())  # Añadir un salto de página

# Crear la gráfica de pastel mejorada
def create_pie_chart(labels, sizes, name_img, title):
    fig, ax = plt.subplots(figsize=(10, 7))  # Crear una figura y ejes
    colors = plt.cm.Paired(range(len(labels)))  # Usar una paleta de colores atractiva
    
    # Graficar la gráfica de pastel con colores personalizados
    wedges, texts, autotexts = ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    
    # Añadir el título con un tamaño de fuente mayor
    ax.set_title(title, fontsize=16)
    
    # Asegurar que la gráfica de pastel se vea circular
    ax.set_aspect('equal')
    
    # Ajustar los márgenes de la figura
    plt.tight_layout()
    
    # Guardar la gráfica como imagen
    plot_path = os.path.join(script_dir, name_img)
    plt.savefig(plot_path, bbox_inches='tight')
    plt.close()
    return plot_path

# Función para crear el PDF con reportlab
def create_pdf(pdf_path, BotellaGeneral, TiempoCargaGeneral, ProyeccionBotellaGeneral, ProyeccionTiempoCargaGeneral, BotellaTorre, TiempoCargaTorre, PromedioElectricidadTorre, PieChart, BotellaUsuarios, TiempoCargaUsuarios, PromedioElectricidadUsuarios):
    doc = SimpleDocTemplate(pdf_path, pagesize=landscape(letter))  # Crear un documento PDF en formato horizontal
    
    # Añadir las secciones con texto y gráficos al PDF
    create_text_and_graphic_lineal(BotellaGeneral, "Estadísticas de las Botellas en general")
    create_text_and_graphic_lineal(TiempoCargaGeneral, "Estadísticas del Tiempo de Carga en general")
    create_text_and_graphic_lineal(ProyeccionBotellaGeneral, "Proyección de regresión lineal de las Botellas en general")
    create_text_and_graphic_lineal(ProyeccionTiempoCargaGeneral, "Proyección de regresión lineal del Tiempo de Carga en general")
    
    create_text_and_graphic_lineal(BotellaTorre, "Estadísticas de las Botellas de las Torres en general")
    create_text_and_graphic_lineal(TiempoCargaTorre, "Estadísticas del Tiempo de Carga de las Torres en general")
    create_text_and_graphic_lineal(PromedioElectricidadTorre, "Estadísticas del Promedio de Electricidad de las Torres en general")
    create_text_and_graphic_lineal(PieChart, "Comparacion Rendimiento de Torres de Carga")
    create_text_and_graphic_lineal(BotellaUsuarios, "Estadísticas de las Botellas de los Usuarios en general")
    create_text_and_graphic_lineal(TiempoCargaUsuarios, "Estadísticas del Tiempo de Carga de los Usuarios en general")
    create_text_and_graphic_lineal(PromedioElectricidadUsuarios, "Estadísticas del Promedio de Electricidad de los Usuarios en general")
    
    doc.build(flowables)  # Construir el PDF con los elementos añadidos

# Función para enviar el correo con el PDF adjunto
def send_email(pdf_path, recipient_emails):
    sender_email = "rocobros21@gmail.com"
    sender_password = "tikf twbs whfa sxna"
    subject = "Reporte PDF Trimestral Generado"
    body = "Adjunto encontrarás el reporte PDF generado del trimestre."

    # Crear el objeto del mensaje
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = ", ".join(recipient_emails)
    msg['Subject'] = subject

    # Adjuntar el cuerpo del correo
    msg.attach(MIMEText(body, 'plain'))

    # Adjuntar el archivo PDF
    attachment = open(pdf_path, "rb")
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', f"attachment; filename= {os.path.basename(pdf_path)}")
    msg.attach(part)

    # Configurar el servidor SMTP
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)

    # Enviar el correo
    text = msg.as_string()
    server.sendmail(sender_email, recipient_emails, text)
    server.quit()

    print(f'Correo enviado exitosamente a {recipient_emails}')

# Autenticación y obtención de datos
jwt_response = requests.post('https://chargreen.com.mx/api/login', json={'username': 'Rocobros21', 'password': 'Rocobros2105'})

# Manejo de errores
if jwt_response.status_code != 200:
    raise Exception(f"Error en la autenticación: {jwt_response.text}")

jwt_data = jwt_response.json()
token = jwt_data['token']

# Obtener datos de métricas
headers = {'Authorization': f'Bearer {token}'}
metricas_response = requests.get('https://chargreen.com.mx/api/metricas', headers=headers)

# Manejo de errores
if metricas_response.status_code != 200:
    raise Exception(f"Error al obtener métricas: {metricas_response.text}")

metricas_data = metricas_response.json()

# Filtrar datos de los últimos 3 meses
current_date = datetime.now()
three_months_ago = current_date - timedelta(days=90)
filtered_metricas = [m for m in metricas_data if datetime.strptime(m['Fecha'], '%Y-%m-%dT%H:%M:%S.%fZ') >= three_months_ago]

# Crear diccionario con conteos y sumas por Torre
result = {}
for metrica in filtered_metricas:
    torre = metrica['Torre']
    segundos = metrica['Segundos']
    
    if torre not in result:
        result[torre] = {'count': 0, 'total_segundos': 0}
    
    result[torre]['count'] += 1
    result[torre]['total_segundos'] += segundos

torresEspecifico = []
segundosEspecifico = []
conteosEspecifico = []
wattsEspecifico = []

for torre, data in result.items():
    torresEspecifico.append(torre)
    segundosEspecifico.append(data['total_segundos'])
    conteosEspecifico.append(data['count'])
    wattsEspecifico.append(data['total_segundos'] / 3600 * 20)

# Crear diccionario con conteos y sumas por Usuario
result = {}
for metrica in filtered_metricas:
    usuario = metrica['Usuario']
    segundos = metrica['Segundos']
    
    if usuario not in result:
        result[usuario] = {'count': 0, 'total_segundos': 0}
    
    result[usuario]['count'] += 1
    result[usuario]['total_segundos'] += segundos

usuariosEspecifico = []
segundosUsuariosEspecifico = []
conteosUsuariosEspecifico = []
wattsUsuariosEspecifico = []

for usuario, data in result.items():
    usuariosEspecifico.append(usuario)
    segundosUsuariosEspecifico.append(data['total_segundos'])
    conteosUsuariosEspecifico.append(data['count'])
    wattsUsuariosEspecifico.append(data['total_segundos'] / 3600 * 20)

# Crear diccionario con conteos y sumas por Fecha
result = {}
for metrica in filtered_metricas:
    fecha = metrica['Fecha'][:10]  # Considerar solo la fecha sin la hora
    segundos = metrica['Segundos']
    
    if fecha not in result:
        result[fecha] = {'count': 0, 'total_segundos': 0}
    
    result[fecha]['count'] += 1
    result[fecha]['total_segundos'] += segundos

# Ordenar el diccionario por fecha
sorted_result = dict(sorted(result.items(), key=lambda item: datetime.strptime(item[0], '%Y-%m-%d')))

fechasEspecifico = []
segundosFechasEspecifico = []
conteosFechasEspecifico = []
wattsFechasEspecifico = []

for fecha, data in sorted_result.items():
    fechasEspecifico.append(fecha)
    segundosFechasEspecifico.append(data['total_segundos'])
    conteosFechasEspecifico.append(data['count'])
    wattsFechasEspecifico.append(data['total_segundos'] / 3600 * 20)

# Crear las gráficas de líneas

x7 = fechasEspecifico
y7 = conteosFechasEspecifico
name_img7 = 'plot7.png'
BotellaGeneral = create_line_plot_with_linear_regression(x7, y7, name_img7, 'Fecha', 'Cantidad', 'Botellas')
name_img7_projection = 'plot7_projection.png'
ProyeccionBotellaGeneral = create_regression_projection_plot(x7, y7, name_img7_projection, 'Fecha', 'Cantidad', 'Proyección Botellas', months=3)

x8 = fechasEspecifico
y8 = segundosFechasEspecifico
name_img8 = 'plot8.png'
TiempoCargaGeneral = create_line_plot_with_linear_regression(x8, y8, name_img8, 'Fecha', 'Segundos', 'Botellas')
name_img8_projection = 'plot8_projection.png'
ProyeccionTiempoCargaGeneral = create_regression_projection_plot(x8, y8, name_img8_projection, 'Fecha', 'Segundos', 'Proyección Tiempo de Carga', months=3)

#SELECT Fecha, COUNT(*) AS CantidadRegistros FROM registro GROUP BY Fecha ORDER BY Fecha;
x1 = torresEspecifico
y1 = conteosEspecifico
name_img1 = 'plot1.png'
BotellaTorre = create_line_plot(x1, y1, name_img1, 'Nombre Torre', 'Cantidad', 'Botellas')

#SELECT registro.Fecha, SUM(botellaslatas.Segundos) AS TotalSegundos FROM registro INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id GROUP BY registro.Fecha ORDER BY registro.Fecha;
x2 = torresEspecifico
y2 = segundosEspecifico
name_img2 = 'plot2.png'
TiempoCargaTorre = create_line_plot(x2, y2, name_img2, 'Nombre Torre', 'Segundos', 'Tiempo de carga')

#SELECT registro.Fecha, SUM(botellaslatas.Segundos) * 0.005555 AS TotalWatts  FROM registro  INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id  GROUP BY registro.Fecha  ORDER BY registro.Fecha;
x3 = torresEspecifico
y3 = wattsEspecifico
name_img3 = 'plot3.png'
PromedioElectricidadTorre = create_line_plot(x3, y3, name_img3, 'Nombre Torre', 'Watts', 'Promedio de Electricidad')

#SELECT salidas.TorreCarga, COUNT(*) AS CantidadRegistros FROM registro INNER JOIN salidas ON registro.Salida = salidas.Id GROUP BY salidas.TorreCarga ORDER BY salidas.TorreCarga;
labels = torresEspecifico
sizes = conteosEspecifico
name_img_pie = 'pie_chart.png'
PieChart = create_pie_chart(labels, sizes, name_img_pie, 'Comparacion Redimientos')

#SELECT Fecha, COUNT(*) AS CantidadRegistros FROM registro GROUP BY Fecha ORDER BY Fecha;
x4 = usuariosEspecifico
y4 = conteosUsuariosEspecifico
name_img4 = 'plot4.png'
BotellaUsuarios = create_line_plot(x4, y4, name_img4, 'Usuario', 'Cantidad', 'Botellas de los Usuarios')

#SELECT registro.Fecha, SUM(botellaslatas.Segundos) AS TotalSegundos FROM registro INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id GROUP BY registro.Fecha ORDER BY registro.Fecha;
x5 = usuariosEspecifico
y5 = segundosUsuariosEspecifico
name_img5 = 'plot5.png'
TiempoCargaUsuarios = create_line_plot(x5, y5, name_img5, 'Usuario', 'Segundos', 'Tiempo de carga de los Usuarios')

#SELECT registro.Fecha, SUM(botellaslatas.Segundos) * 0.005555 AS TotalWatts  FROM registro  INNER JOIN botellaslatas ON registro.Botella = botellaslatas.Id  GROUP BY registro.Fecha  ORDER BY registro.Fecha;
x6 = usuariosEspecifico
y6 = wattsUsuariosEspecifico
name_img6 = 'plot6.png'
PromedioElectricidadUsuarios = create_line_plot(x6, y6, name_img6, 'Usuario', 'Watts', 'Promedio de Electricidad de los Usuarios')

# Crear el PDF
pdf_path = os.path.join(script_dir, 'Reporte.pdf')
create_pdf(pdf_path, BotellaGeneral, TiempoCargaGeneral, ProyeccionBotellaGeneral, ProyeccionTiempoCargaGeneral, BotellaTorre, TiempoCargaTorre, PromedioElectricidadTorre, PieChart, BotellaUsuarios, TiempoCargaUsuarios, PromedioElectricidadUsuarios)

print(f'PDF creado exitosamente: {pdf_path}')

admins_response = requests.get('https://chargreen.com.mx/api/admins', headers=headers)
admins_data = admins_response.json()
correos = [item['Correo'] for item in admins_data]

# Envía el PDF generado por correo electrónico
send_email(pdf_path, correos)
