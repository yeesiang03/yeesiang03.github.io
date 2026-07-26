from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public"
PDF_PATH = OUTPUT / "Ku_Yee_Siang_Resume.pdf"
PUBLIC_PATH = PUBLIC / "Ku_Yee_Siang_Resume.pdf"

INK = colors.HexColor("#1A202C")
ACCENT = colors.HexColor("#1B5C87")
MUTED = colors.HexColor("#515E6B")
RULE = colors.HexColor("#B9C9D6")


def register_font():
    font_candidates = [
        Path(r"C:\Windows\Fonts\aptos.ttf"),
        Path(r"C:\Windows\Fonts\arial.ttf"),
    ]
    bold_candidates = [
        Path(r"C:\Windows\Fonts\aptos-bold.ttf"),
        Path(r"C:\Windows\Fonts\arialbd.ttf"),
    ]
    regular = next((p for p in font_candidates if p.exists()), None)
    bold = next((p for p in bold_candidates if p.exists()), None)
    if regular and bold:
        pdfmetrics.registerFont(TTFont("Resume", str(regular)))
        pdfmetrics.registerFont(TTFont("Resume-Bold", str(bold)))
        return "Resume", "Resume-Bold"
    return "Helvetica", "Helvetica-Bold"


def build_pdf(path):
    font, font_bold = register_font()
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "ResumeTitle",
        parent=styles["Normal"],
        fontName=font_bold,
        fontSize=21,
        leading=22,
        textColor=ACCENT,
        alignment=TA_CENTER,
        spaceAfter=0,
    )
    role = ParagraphStyle(
        "ResumeRole",
        parent=styles["Normal"],
        fontName=font_bold,
        fontSize=9.7,
        leading=11,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=1,
    )
    contact = ParagraphStyle(
        "ResumeContact",
        parent=styles["Normal"],
        fontName=font,
        fontSize=7.8,
        leading=9.5,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=3,
    )
    section_style = ParagraphStyle(
        "ResumeSection",
        parent=styles["Normal"],
        fontName=font_bold,
        fontSize=9.5,
        leading=10,
        textColor=ACCENT,
        spaceBefore=3,
        spaceAfter=1.5,
    )
    body = ParagraphStyle(
        "ResumeBody",
        parent=styles["Normal"],
        fontName=font,
        fontSize=8.25,
        leading=9.6,
        textColor=INK,
        spaceAfter=1,
    )
    project_title = ParagraphStyle(
        "ProjectTitle",
        parent=body,
        fontName=font_bold,
        fontSize=8.75,
        leading=9.8,
        spaceBefore=0.8,
        spaceAfter=0,
    )
    bullet = ParagraphStyle(
        "ProjectBullet",
        parent=body,
        fontSize=7.85,
        leading=9.05,
        leftIndent=10,
        firstLineIndent=-6,
        bulletIndent=0,
        spaceAfter=0.7,
    )
    skill_label = ParagraphStyle(
        "SkillLabel",
        parent=body,
        fontName=font_bold,
        fontSize=7.7,
        leading=8.6,
        textColor=ACCENT,
    )
    skill_value = ParagraphStyle(
        "SkillValue",
        parent=body,
        fontSize=7.55,
        leading=8.55,
    )

    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        rightMargin=0.48 * inch,
        leftMargin=0.48 * inch,
        topMargin=0.38 * inch,
        bottomMargin=0.34 * inch,
        title="Ku Yee Siang - AI Automation & Agent Engineer Resume",
        author="Ku Yee Siang",
        subject="AI Automation & Agent Engineer Resume",
    )

    story = [
        Paragraph("KU YEE SIANG", title),
        Paragraph("AI AUTOMATION &amp; AGENT ENGINEER", role),
        Paragraph(
            "+60 17-421 6727 &nbsp;|&nbsp; yeesiangku@gmail.com<br/>"
            "github.com/yeesiang03 &nbsp;|&nbsp; linkedin.com/in/yee-siang-ku-11b069315",
            contact,
        ),
        HRFlowable(width="100%", thickness=1.0, color=ACCENT, spaceBefore=0, spaceAfter=2),
        Paragraph("PROFESSIONAL PROFILE", section_style),
        HRFlowable(width="100%", thickness=0.45, color=RULE, spaceBefore=0, spaceAfter=2),
        Paragraph(
            "Artificial Intelligence graduate focused on AI automation, agentic systems, and end-to-end product delivery. "
            "Built secure multi-agent workflows, LLM evaluation benchmarks, retrieval-augmented applications, and "
            "full-stack business tools using Python and TypeScript. Skilled at translating requirements into working "
            "solutions, integrating APIs and databases, and improving reliability through validation and safety guardrails.",
            body,
        ),
        Paragraph("EDUCATION &amp; AWARD", section_style),
        HRFlowable(width="100%", thickness=0.45, color=RULE, spaceBefore=0, spaceAfter=2),
        Paragraph(
            "<b>Beijing Institute of Technology</b> &nbsp;|&nbsp; Bachelor of Science in Artificial Intelligence "
            "&nbsp;|&nbsp; 2022-2026<br/><font color='#1B5C87'><b>GPA: 3.6/4.0 &nbsp;|&nbsp; Best Student Award</b></font>",
            body,
        ),
        Paragraph("SELECTED PROJECTS", section_style),
        HRFlowable(width="100%", thickness=0.45, color=RULE, spaceBefore=0, spaceAfter=2),
    ]

    projects = [
        (
            "Harness Agent - Enterprise Procurement Workbench",
            "Agent Engineering",
            [
                "Built an AI-powered procurement workbench that automates product sourcing, supplier comparison, inventory analysis, purchase-order workflows, product onboarding, and report generation.",
                "Engineered the Vue 3 and FastAPI platform with DeepSeek, MCP/ERP tools, specialist sub-agents, SSE execution streaming, human approval, long-term memory, progressive skills, and per-user OpenSandbox isolation.",
            ],
        ),
        (
            "Medical LLM Causal Consistency Evaluation Benchmark",
            "Graduation Thesis",
            [
                "Designed and built MedCausalBenchmark from six NCCN clinical guidelines using a dual-axis taxonomy covering medical scenarios and Basic, Joint, Nested, and Conditional counterfactual reasoning.",
                "Created a repeatable evaluation workflow comparing Pure LLM, RAG, and CausalSCM across Qwen, LLaMA, and DeepSeek; CausalSCM achieved 91.39% average accuracy.",
            ],
        ),
        (
            "Mini-Map - Gemini-Powered Virtual Travel Journal",
            "Google Cloud Rapid Agent Hackathon",
            [
                "Developed a choice-driven travel application with Gemini Pro, Google Cloud Agent Builder, FastAPI, Next.js, and MongoDB Atlas, turning user preferences into journeys constrained by geography and budget.",
                "Integrated validated MCP tools, GeoJSON persistence, Atlas Vector Search with 1024-dimensional embeddings, external API grounding, deduplication safeguards, and one-click itinerary export.",
            ],
        ),
        (
            "Agentic Medical Chat System",
            "Full-Stack AI",
            [
                "Built an end-to-end medical Q&amp;A application combining tool-augmented LLM agents, retrieval, a web interface, and safety guardrails for structured clinical conversations.",
                "Integrated frontend, agent orchestration, backend retrieval, validation, and error handling into a traceable full-stack workflow for safer medical information delivery.",
            ],
        ),
    ]

    for name, label, bullets in projects:
        block = [
            Paragraph(
                f"{name} &nbsp;<font name='{font}' color='#515E6B' size='7.8'>|&nbsp; <i>{label}</i></font>",
                project_title,
            )
        ]
        block.extend(Paragraph(item, bullet, bulletText="•") for item in bullets)
        story.append(KeepTogether(block))

    story.extend(
        [
            Paragraph("TECHNICAL SKILLS", section_style),
            HRFlowable(width="100%", thickness=0.45, color=RULE, spaceBefore=0, spaceAfter=2),
        ]
    )
    skills = [
        ("Programming", "Python, TypeScript, JavaScript, SQL, HTML/CSS"),
        ("Agentic AI &amp; LLM", "Agent orchestration, multi-agent systems, LLM evaluation, benchmark design, RAG, prompt and context engineering, tool calling, human-in-the-loop, memory, safety guardrails"),
        ("Models &amp; Platforms", "DeepSeek, Gemini Pro, Qwen, LLaMA, OpenAI Codex, Google Cloud Agent Builder, Vertex AI, MCP, OpenSandbox"),
        ("Full-Stack", "FastAPI, React, Next.js, Vue 3, Tailwind CSS, REST APIs, Server-Sent Events, API integration"),
        ("Data &amp; Search", "MongoDB Atlas, Atlas Search, Vector Search, SQLite, embeddings, GeoJSON"),
        ("Engineering Practices", "Requirements analysis, debugging, testing, validation, access control, data isolation, Git/GitHub, Vercel"),
    ]
    skill_rows = [
        [Paragraph(label, skill_label), Paragraph(value, skill_value)]
        for label, value in skills
    ]
    skill_table = Table(skill_rows, colWidths=[1.1 * inch, 6.35 * inch], hAlign="LEFT")
    skill_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 0.4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.4),
            ]
        )
    )
    story.append(skill_table)

    doc.build(story)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    build_pdf(PDF_PATH)
    PUBLIC_PATH.write_bytes(PDF_PATH.read_bytes())
    print(PDF_PATH)
    print(PUBLIC_PATH)


if __name__ == "__main__":
    main()
