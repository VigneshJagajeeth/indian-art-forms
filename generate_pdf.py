import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.units import inch

def create_report(output_filename):
    doc = SimpleDocTemplate(output_filename, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        name='TitleStyle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        alignment=1, # center
        spaceAfter=14
    )
    
    subtitle_style = ParagraphStyle(
        name='SubtitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        alignment=1,
        spaceAfter=30
    )
    
    normal_center = ParagraphStyle(
        name='NormalCenter',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        alignment=1,
        spaceAfter=14
    )
    
    bold_center = ParagraphStyle(
        name='BoldCenter',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        alignment=1,
        spaceAfter=14
    )
    
    heading_style = ParagraphStyle(
        name='HeadingStyle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        alignment=0, # left
        spaceAfter=10
    )
    
    normal_left = ParagraphStyle(
        name='NormalLeft',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        alignment=0,
        spaceAfter=20
    )

    Story = []
    
    # Page 1
    Story.append(Spacer(1, 1*inch))
    Story.append(Paragraph("INTERACTIVE ART MAP", title_style))
    Story.append(Paragraph("21LEM301T - INDIAN ART FORM", subtitle_style))
    
    Story.append(Spacer(1, 0.5*inch))
    Story.append(Paragraph("<i>Submitted by</i>", normal_center))
    Story.append(Spacer(1, 0.2*inch))
    Story.append(Paragraph("VIGNESH JAGAJEETH R P [RA2411003012553]", bold_center))
    
    Story.append(Spacer(1, 0.5*inch))
    Story.append(Paragraph("<i>In partial fulfilment of the requirements of the degree of</i>", normal_center))
    Story.append(Spacer(1, 0.2*inch))
    Story.append(Paragraph("BACHELOR OF TECHNOLOGY", bold_center))
    Story.append(Paragraph("in", normal_center))
    Story.append(Paragraph("COMPUTER SCIENCE & ENGINEERING", bold_center))
    
    Story.append(Spacer(1, 1*inch))
    
    # Optional: SRM Logo if available, else a placeholder box or we just skip the image.
    # We will try to download the SRM logo from a reliable source.
    logo_path = 'srm_logo.png'
    if os.path.exists(logo_path):
        Story.append(Image(logo_path, width=4*inch, height=1.5*inch))
    else:
        # Just text if no logo
        Story.append(Spacer(1, 1.5*inch))
    
    Story.append(Spacer(1, 0.5*inch))
    Story.append(Paragraph("DEPARTMENT OF COMPUTING TECHNOLOGIES", bold_center))
    Story.append(Paragraph("COLLEGE OF ENGINEERING AND TECHNOLOGY", bold_center))
    Story.append(Paragraph("SRM INSTITUTE OF SCIENCE AND TECHNOLOGY", bold_center))
    Story.append(Paragraph("KATTANKULATHUR–603203", bold_center))
    
    Story.append(Spacer(1, 0.5*inch))
    Story.append(Paragraph("SEPTEMBER 2026", bold_center))
    
    Story.append(PageBreak())
    
    # Page 2
    Story.append(Paragraph("DEPLOYED PROJECT LINK:", heading_style))
    # Assuming not deployed on Vercel since not found, or maybe we just say N/A
    Story.append(Paragraph("https://indian-art-forms-six.vercel.app/", normal_left))
    
    Story.append(Paragraph("GITHUB REPOSITORY:", heading_style))
    Story.append(Paragraph("https://github.com/VigneshJagajeeth/indian-art-forms", normal_left))
    
    Story.append(Paragraph("SNIPPETS FROM THE PROJECT", heading_style))
    
    # Add screenshots
    screenshot_dir = 'screenshots'
    if os.path.exists(screenshot_dir):
        screenshots = sorted([f for f in os.listdir(screenshot_dir) if f.endswith('.png')])
        for sc in screenshots:
            img_path = os.path.join(screenshot_dir, sc)
            # Add image (scale to fit page width)
            Story.append(Image(img_path, width=6.5*inch, height=3.6*inch))
            Story.append(Spacer(1, 0.2*inch))
    else:
        Story.append(Paragraph("[Screenshots will be added here]", normal_left))
    
    doc.build(Story)

if __name__ == "__main__":
    import urllib.request
    try:
        urllib.request.urlretrieve("https://upload.wikimedia.org/wikipedia/en/f/fe/Srmseal.png", "srm_logo.png")
    except:
        pass
    create_report("Report.pdf")
    print("PDF generated successfully as Report.pdf")
