# Scaliify — HR Tool Finder Requirements & Scoring Specification

## 1. Executive Summary

The **Scaliify HR Tool Finder** is an interactive, consultative assessment tool designed to help organizations navigate the complex HR software landscape. By capturing key organizational dimensions (team size, geographic spread, administrative depth, payroll complexity, recruiting volume, performance management, and integration needs), the engine produces ranked, scored software recommendations accompanied by qualitative rationale.

---

## 2. User Journey Flow

```
[ Step 0: Intro Screen ]
        │
[ Step 1: Company Size (1-25 / 26-100 / 101-500 / 500+) ]
        │
[ Step 2: Geographic Reach (DACH / UK & Europe / Global Distributed / North America / MENA) ]
        │
[ Step 3: Current HR Software Baseline (None / Replace Legacy / ATS Only / Performance Only) ]
        │
[ Step 4: Core HR Administration Requirements (Master Data / Onboarding / GDPR / Document Signatures / Shift Planning) ]
        │
[ Step 5: Payroll & Contractor Model (DATEV / Local European / Global EOR & Contractors / Multi-Currency) ]
        │
[ Step 6: Recruiting & ATS Capabilities (Multiposting / Scorecards / Structured Interviews / Talent Pooling / Analytics) ]
        │
[ Step 7: Performance & Enablement (360° Reviews / OKRs / Continuous Feedback / Comp Benchmarking) ]
        │
[ Step 8: Time Tracking & Compliance (BAG/EU Law Compliant / Project & Billing / Shift & Overtime) ]
        │
[ Step 9: Critical Integrations (DATEV / Slack & Teams / Google & Microsoft SSO / Open API) ]
        │
[ Step 10: Lead Information (Name, Work Email, Company, Job Role, Phone) ]
        │
[ Real-time Calculating Screen (Analyzing 20+ HR Systems against criteria) ]
        │
[ Step 11: Dynamic Results & Ranked Recommendations Dashboard ]
        │
[ CTA: Schedule Deep-Dive Consultation with Scaliify Advisors ]
```

---

## 3. Detailed Question Specifications

### Step 1: Company Size (Single Select)
* **`size_startup`**: 1 – 25 employees (Early Stage / High Flexibility)
* **`size_sme`**: 26 – 100 employees (Scaling SME / Standardizing Processes)
* **`size_midmarket`**: 101 – 500 employees (Mid-Market / Complex Permissions & Workflows)
* **`size_enterprise`**: 500+ employees (Enterprise / Multi-Entity Global Scale)

### Step 2: Primary Operating Regions (Multi-Select)
* **`region_dach`**: Germany, Austria, Switzerland (DACH focus, strict GDPR, German contracts)
* **`region_uk_europe`**: UK & Western Europe
* **`region_global`**: Global Remote / Distributed Workforce (50+ countries)
* **`region_north_america`**: US & Canada
* **`region_mena`**: Middle East & North Africa

### Step 3: Current Software Status (Single Select)
* **`status_scratch`**: Spreadsheets & manual processes (Starting fresh)
* **`status_replace_hris`**: Looking to replace existing all-in-one HRIS
* **`status_dedicated_ats`**: Searching for a specialized Recruiting / ATS tool
* **`status_dedicated_perf`**: Searching for a specialized Performance & OKR tool

### Step 4: Core HR Administration Needs (Multi-Select)
* **`core_digital_records`**: Digital employee files & central master data
* **`core_onboarding`**: Automated onboarding & offboarding workflows
* **`core_compliance`**: Strict German/EU compliance & audit trails
* **`core_signatures`**: Built-in digital document signing & templates
* **`core_org_charts`**: Dynamic organizational charts & role hierarchies

### Step 5: Payroll & Contractor Handling (Single Select)
* **`payroll_datev`**: German payroll with DATEV / Addison export & accountant integration
* **`payroll_local_eu`**: European local payroll providers in specific countries
* **`payroll_global_eor`**: Global Employer of Record (EOR) & multi-country contractors
* **`payroll_internal`**: Fully internal payroll processing

### Step 6: Recruiting & ATS Needs (Multi-Select)
* **`ats_multiposting`**: 1-click multiposting to major job boards (LinkedIn, Stepstone, Indeed)
* **`ats_structured_hiring`**: Structured interview scorecards & hiring manager collaboration
* **`ats_candidate_experience`**: Custom branded careers page & candidate self-scheduling
* **`ats_talent_pool`**: Talent pool management & GDPR-compliant candidate archiving
* **`ats_advanced_analytics`**: Time-to-hire, cost-per-hire, and recruitment pipeline analytics

### Step 7: Performance & Enablement (Multi-Select)
* **`perf_360_reviews`**: 360-degree performance review cycles & peer feedback
* **`perf_okrs`**: Company, team, and individual OKR / goal tracking
* **`perf_continuous_1on1`**: Continuous check-ins, 1:1 meeting templates & pulse surveys
* **`perf_compensation`**: Salary benchmarking & compensation planning

### Step 8: Time & Attendance (Multi-Select)
* **`time_bag_compliant`**: German BAG-compliant working time recording (clock-in/clock-out)
* **`time_absence`**: Vacation, sick leave & parental leave management
* **`time_project_billing`**: Project-based time tracking & client billable hours
* **`time_shift_planning`**: Shift scheduling & rota management

### Step 9: Critical Integrations (Multi-Select)
* **`int_datev`**: DATEV / Accounting software sync
* **`int_slack_teams`**: Slack & Microsoft Teams notification bots
* **`int_sso`**: Google Workspace / Microsoft Entra ID (Azure AD) / Okta SSO
* **`int_api`**: Open REST API & Webhooks for custom integrations

### Step 10: Lead Information
* **`firstName`** (string, required)
* **`lastName`** (string, required)
* **`email`** (string, email format, required)
* **`companyName`** (string, required)
* **`jobTitle`** (string, required)
* **`phone`** (string, optional)
* **`comments`** (string, optional)

---

## 4. Scoring Algorithm & Weighting Matrix

The Recommendation Engine calculates a composite fit score $S(t) \in [0, 100]$ for each tool $t$ in the database:

$$S(t) = \sum_{k \in \text{Categories}} W_k \cdot M_k(t, u)$$

Where:
* $W_k$ represents the category weight (e.g. Size: 15%, Region: 20%, Core HR: 20%, Payroll: 15%, ATS: 10%, Performance: 10%, Time: 5%, Integrations: 5%).
* $M_k(t, u) \in [0, 1]$ represents the normalized match score between the tool's capabilities and user's selections.

### Category Scoring Highlights:
1. **Region & Compliance Multiplier**: If the user selects DACH and DATEV, tools like **Personio** and **Factorial** receive heavy regional bonuses, while US-centric tools with weak DATEV support receive penalties.
2. **Global EOR Multiplier**: If the user selects Global Remote + Global EOR, platforms like **Deel**, **Workmotion**, and **Rippling** receive top-tier weighting.
3. **High-Growth Tech ATS**: If the user selects high-volume structured hiring with custom analytics, specialized tools like **Greenhouse** and **Ashby** score highest in the ATS module.
4. **Performance Enablement**: If OKRs and 360° reviews are emphasized, **Leapsome** and **Tellent HR Grow** lead the performance matrix.

---

## 5. Output Payload Structure

```json
{
  "submissionId": "sub_1092830192",
  "leadId": "lead_910283",
  "topRecommendations": [
    {
      "toolId": "personio",
      "name": "Personio",
      "slug": "personio",
      "matchPercentage": 94,
      "badge": "Best Overall DACH Fit",
      "category": "All-in-One HRIS",
      "summary": "Market leader for European SMEs with deep DATEV integration, automated onboarding, and BAG-compliant time tracking.",
      "matchedFeatures": [
        "Native DATEV payroll export",
        "BAG-compliant time tracking",
        "Automated onboarding workflows",
        "German & EU GDPR compliance"
      ],
      "bestSuitedFor": "DACH SMEs scaling from 20 to 500 employees looking for a single source of truth.",
      "websiteUrl": "https://personio.com"
    },
    {
      "toolId": "deel",
      "name": "Deel",
      "slug": "deel",
      "matchPercentage": 88,
      "badge": "Best for Global Teams",
      "category": "Global HR & Payroll",
      "summary": "Industry benchmark for international hiring, contractor management, and global payroll across 150+ countries.",
      "matchedFeatures": [
        "Global Employer of Record (EOR)",
        "Multi-currency contractor payouts",
        "Automated compliance in 150+ countries"
      ],
      "bestSuitedFor": "Distributed international teams and companies hiring across borders.",
      "websiteUrl": "https://deel.com"
    }
  ]
}
```
