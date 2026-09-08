import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ActionLink } from "@/components/ui/action-link";
import { fitCallLinkProps } from "@/config/site";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import styles from "./page.module.css";

const benefits = [
  [
    "01",
    "Recover missed calls",
    "A missed call becomes work someone can see and own.",
  ],
  [
    "02",
    "Keep follow-up from disappearing",
    "Callbacks and estimates stay visible until they are handled.",
  ],
  [
    "03",
    "Show you what it recovered",
    "You see what Keepfire caught and what came of it.",
  ],
] as const;

const included = [
  ["Missed-call recovery", ""],
  ["Callback and estimate follow-up", ""],
  ["Job loose-end tracking", ""],
  [
    "Phone and text infrastructure",
    "Keep your existing number, with normal calling and texting included.",
  ],
  ["Done-for-you setup and configuration", ""],
  ["Owner onboarding and team training", ""],
  ["Launch support", ""],
] as const;

const terms = [
  "First 21 days free",
  "Month-to-month",
  "First paid month refundable",
] as const;

const questions = [
  [
    "When can I get started?",
    "Fit calls are open now. We’re selecting the first 5 HVAC companies for launch and will schedule setup as launch slots open.",
  ],
  [
    "Can I keep my phone number?",
    "Yes. Keepfire is designed to work with the number your customers already call.",
  ],
  [
    "What will it cost?",
    "Launch pricing is $500/month. Implementation is $1,000, waived for our first 5 customers. Your first 21 days are free. We will confirm the final plan before any commitment.",
  ],
  [
    "Can I book a call before setup is available?",
    "Absolutely. A 20-minute fit call is the best way to see whether Keepfire fits your shop and to hear the expected launch timing.",
  ],
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={`site-container ${styles.heroGrid}`}>
            <div className={styles.intro}>
              <div className={styles.eyebrow}>
                <span>NOW SELECTING OUR FIRST 5 HVAC COMPANIES</span>
              </div>
              <h1>You already paid to get that customer on the phone.</h1>
              <p className={styles.lead}>
                <strong>Some loose ends cost you revenue.</strong>
                <br></br>A missed call lands in the call log. An estimate sits
                in the system. A callback gets written down somewhere. Nobody
                clearly owns what happens next.
              </p>
              <p className={styles.lead}>
                <strong>Others cost you trust.</strong>
                <br></br>A customer waits for an update. A job stalls without a
                next step. Everyone assumes someone else handled it.
              </p>
              <p className={styles.lead}>
                Keepfire turns those loose ends into visible, owned work until
                they&apos;re actually handled.
              </p>
              <div className={styles.actions}>
                <ActionLink {...fitCallLinkProps}>
                  Book a 20-minute fit call{" "}
                  <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </ActionLink>
              </div>
            </div>

            <aside className={styles.pricing} aria-label="Launch pricing">
              <div>
                <p className={styles.eyebrow}>Launch pricing</p>
                <div className={styles.price}>
                  <span className={styles.priceValue}>$500</span>
                  <span className={styles.priceUnit}>/ month</span>
                </div>
                <p className={styles.trial}>First 21 days free.</p>

                <div className={styles.offer}>
                  <p className={styles.eyebrow}>Founding launch offer</p>
                  <p className={styles.offerLabel}>Implementation fee</p>
                  <div className={styles.offerAmount}>
                    <s aria-label="Regular implementation fee: $1,000">
                      $1,000
                    </s>
                    <span aria-label="Launch implementation fee: $0">$0</span>
                  </div>
                  <p className={styles.offerLimit}>
                    We&apos;re waiving implementation for our first 5 customers.
                  </p>
                </div>

                <ul className={styles.inclusions}>
                  <li>
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    Setup and training included
                  </li>
                  <li>
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    Normal phone/text usage included
                  </li>
                  <li>
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    Month-to-month
                  </li>
                  <li>
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    First paid month refundable
                  </li>
                </ul>

                <ActionLink {...fitCallLinkProps} className={styles.cardAction}>
                  Book a 20-minute fit call
                </ActionLink>
                <p className={styles.finePrint}>
                  No card. No setup commitment on the call.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={`site-container ${styles.benefitGrid}`}>
            {benefits.map(([number, title, description]) => (
              <article key={number} className={styles.benefit}>
                <span className={styles.eyebrow}>{number}</span>
                <h2 className={styles.benefitTitle}>{title}</h2>
                <p className={styles.benefitCopy}>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.included}>
          <div className={`site-container ${styles.includedGrid}`}>
            <div className={styles.includedIntro}>
              <p className={styles.eyebrow}>What you get</p>
              <h2 className={styles.includedTitle}>
                What Keepfire brings to your shop
              </h2>
              <ul className={styles.includedList}>
                {included.map(([label, detail]) => (
                  <li key={label}>
                    <span className={styles.includedLabel}>{label}</span>
                    {detail ? (
                      <span className={styles.includedDetail}>{detail}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <aside
              className={styles.summary}
              aria-label="Launch pricing summary"
            >
              <p className={styles.summaryLead}>All of this for</p>
              <div className={styles.price}>
                <span className={styles.priceValue}>$500</span>
                <span className={styles.priceUnit}>/ month</span>
              </div>

              <p className={styles.setup}>
                <s aria-label="Regular setup fee: $1,000">$1,000</s>
                <span className={styles.setupNote}>setup one-time</span>
              </p>
              <p className={styles.waived}>
                <Check size={14} strokeWidth={1.75} aria-hidden="true" />
                Waived for our first 5 customers
              </p>

              <ul className={styles.terms}>
                {terms.map((term) => (
                  <li key={term}>
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    {term}
                  </li>
                ))}
              </ul>

              <div className={styles.payback}>
                <p className={styles.paybackLead}>
                  $1,000 recovered can cover the month.
                </p>
                <p className={styles.paybackMath}>
                  <span className={styles.paybackValue}>$1,000</span> in
                  recovered revenue &times;{" "}
                  <span className={styles.paybackValue}>50%</span> gross margin
                  = <span className={styles.paybackResult}>$500</span>
                </p>
                <p className={styles.paybackNote}>gross profit</p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.launch}>
          <div className={`site-container ${styles.launchGrid}`}>
            <h2>We&apos;re opening Keepfire to our first 5 HVAC companies.</h2>
            <div>
              <p className={styles.launchCopy}>
                Book a fit call and we&apos;ll figure out whether Keepfire
                actually makes sense for your shop. If we can&apos;t see a
                credible path to Keepfire paying for itself, I&apos;ll tell you
                not to use it.
              </p>
              <p className={styles.launchNote}>
                Your number stays yours. Your existing tools stay in place.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={`site-container ${styles.faqInner}`}>
            <h2>Launch Q&A</h2>
            <div className={styles.questions}>
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    <span>{question}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </summary>
                  <p className={styles.answer}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className="site-container">
            <h2>See what your current process is letting through.</h2>
            <p className={styles.closingCopy}>
              Twenty minutes, no card, and an honest answer on whether Keepfire
              is worth your time.
            </p>
            <div className={styles.actions}>
              <ActionLink {...fitCallLinkProps}>
                Book a 20-minute fit call{" "}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </ActionLink>
              <span className={styles.finePrint}>
                $500/month at launch, $1000 implementation fee waived
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
