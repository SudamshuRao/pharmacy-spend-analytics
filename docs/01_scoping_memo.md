# Scoping memo: Medicare Part D drug spend

**Status:** Draft, Phase 0
**Author:** Sudamshu Rao

## Situation
Outpatient drug spend is one of the fastest-growing cost lines for health systems and payers. Leaders know the total is rising, but they usually cannot say how much of the increase comes from higher prices versus more prescriptions, or which drugs to act on first.

## Stakeholder
The assumed audience is a VP of Pharmacy at a health system, or a GPO pharmacy program team that advises members on drug contracting. They need a short list of drugs to act on, with the expected savings and the confidence behind each number.

## Business questions
1. How much did Part D drug spend grow over the last five years, and how much of that growth came from price versus volume?
2. Which drugs drive most of the spend and most of the growth?
3. Where are the largest savings from switching to generics or biosimilars, and how large are they under realistic adoption rates?
4. What does next year's spend look like for the top drug classes, as a range?

## KPIs
- Total spend and year-over-year growth
- Price effect and volume effect (dollars and share of growth)
- Spend per dosage unit and its compound annual growth
- Share of spend in the top 1% and top 10% of drugs
- Estimated annual savings per scenario

## Data
| Source | Grain | Use |
|---|---|---|
| CMS Medicare Part D Spending by Drug | Drug x manufacturer, five years in wide format | Spend, units, claims, beneficiaries, unit-cost trends |
| CMS NADAC | NDC x weekly effective date | Pharmacy acquisition cost for brand and generic versions |

## What the data cannot answer
- **Rebates.** Part D spending figures do not reflect manufacturer rebates or other price concessions, which CMS cannot publish. All spend figures are gross, so net savings will be smaller than gross savings.
- **Hospital-administered drugs.** Part D covers drugs patients take themselves. Infusions and clinic-administered drugs sit in Part B and are out of scope for the first version.
- **Clinical substitution.** The savings scenarios assume a switch is clinically appropriate. Any real recommendation would need pharmacy and therapeutics committee review.
- **Name matching.** Part D reports drug names, while NADAC reports NDC codes. Some drugs will not match cleanly; the match rate and the spend it covers will be reported.

## Approach
1. Load both sources unchanged into DuckDB.
2. Clean and reshape in SQL, build a crosswalk between the two sources, and report the reconciliation results.
3. Analyze spend drivers, concentration and savings scenarios.
4. Forecast next-year spend for the top classes.
5. Deliver a dashboard, a one-page memo and a short deck.

## Deliverables
- Reproducible pipeline and SQL models (GitHub)
- Three-page dashboard
- One-page executive memo and five-slide deck
