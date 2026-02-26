import { createFileRoute } from '@tanstack/react-router'
import { type ReactNode, useMemo, useState } from 'react'
import { ArrowUpRight, Shield, Sparkles, Trophy, Users } from 'lucide-react'

type MarketPreset = {
  label: string
  tension: number
  momentum: number
}

const marketPresets: MarketPreset[] = [
  { label: 'Stable', tension: 0.08, momentum: 0.05 },
  { label: 'Compétitif', tension: 0.25, momentum: 0.18 },
  { label: 'Haute volatilité', tension: 0.42, momentum: 0.3 },
]

function Home() {
  const [fragments, setFragments] = useState(420)
  const [investedByOthers, setInvestedByOthers] = useState(260)
  const [quality, setQuality] = useState(78)
  const [preset, setPreset] = useState<MarketPreset>(marketPresets[1])

  const { base, fi, finalCR } = useMemo(() => {
    const baseScore =
      0.5 * fragments + 0.3 * Math.log(1 + investedByOthers) + 0.2 * quality
    const marketFactor = 1 + preset.tension * preset.momentum
    return {
      base: baseScore,
      fi: marketFactor,
      finalCR: baseScore * marketFactor,
    }
  }, [fragments, investedByOthers, quality, preset])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:py-20">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
          <Sparkles className="h-4 w-4" />
          Script concept — Fragments
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Fragments : la bourse sociale du statut, du mérite et de la stratégie.
            </h1>
            <p className="text-slate-300">
              Une économie interne fermée où la créativité, l&apos;aide communautaire et
              l&apos;influence deviennent une ressource numérique échangeable : les
              <span className="font-semibold text-cyan-300"> Fragments</span>.
            </p>
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <Feature text="Pas d&apos;argent réel, pas de crypto, pas d&apos;investissement financier" />
              <Feature text="Système compétitif avec volatilité contrôlée" />
              <Feature text="Progression fondée sur la qualité des contributions" />
              <Feature text="Rivalités et alliances via les Factions" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-900/20">
            <h2 className="mb-4 text-lg font-semibold">Objectif de la plateforme</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2"><ArrowUpRight className="mt-0.5 h-4 w-4 text-cyan-300" /> Récompenser création, entraide et activité utile.</li>
              <li className="flex gap-2"><ArrowUpRight className="mt-0.5 h-4 w-4 text-cyan-300" /> Permettre le trading social de Fragments entre profils.</li>
              <li className="flex gap-2"><ArrowUpRight className="mt-0.5 h-4 w-4 text-cyan-300" /> Mélanger stabilité de fond + pics d&apos;excitation.</li>
              <li className="flex gap-2"><ArrowUpRight className="mt-0.5 h-4 w-4 text-cyan-300" /> Construire un terrain de jeu stratégique addictif.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-6 md:grid-cols-3">
        <Card icon={<Trophy className="h-4 w-4 text-cyan-300" />} title="Gagner des Fragments">
          Contenus, défis, aide communautaire, bonus viraux et événements spéciaux avec plafond quotidien anti-spam.
        </Card>
        <Card icon={<Users className="h-4 w-4 text-violet-300" />} title="Factions">
          Groupes avec trésors collectifs, stratégies d&apos;alliance et domination dans les classements.
        </Card>
        <Card icon={<Shield className="h-4 w-4 text-emerald-300" />} title="Anti-manipulation">
          Rendement décroissant, limites de retraits, détection de clusters suspects et caps de gains/pertes.
        </Card>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">Simulateur de Cote de Résonance (CR)</h2>
          <p className="mt-2 text-sm text-slate-300">
            Formule : Base = 0.5F + 0.3ln(1 + I) + 0.2Q, puis CR finale = Base × FI, avec FI = 1 + (T × R).
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Slider label="F — Fragments détenus" value={fragments} setValue={setFragments} min={0} max={1000} />
              <Slider label="I — Fragments investis par d'autres" value={investedByOthers} setValue={setInvestedByOthers} min={0} max={1000} />
              <Slider label="Q — Score qualité" value={quality} setValue={setQuality} min={0} max={100} />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Contexte de marché</label>
                <div className="flex flex-wrap gap-2">
                  {marketPresets.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setPreset(option)}
                      className={`rounded-full border px-3 py-1 text-sm transition ${
                        preset.label === option.label
                          ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
                          : 'border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Résultat actuel</p>
              <p className="mt-2 text-3xl font-bold text-cyan-300">CR {finalCR.toFixed(2)}</p>
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p>Base: <span className="font-semibold text-white">{base.toFixed(2)}</span></p>
                <p>Facteur FI: <span className="font-semibold text-white">{fi.toFixed(3)}</span></p>
                <p>Tension × Momentum: <span className="font-semibold text-white">{(preset.tension * preset.momentum).toFixed(3)}</span></p>
              </div>
              <p className="mt-6 text-xs text-slate-400">
                Base stable pour le mérite durable. FI injecte des variations courtes pour maintenir l&apos;énergie compétitive.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Feature({ text }: { text: string }) {
  return <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">{text}</div>
}

function Card({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
      </div>
      <p className="text-sm text-slate-300">{children}</p>
    </article>
  )
}

function Slider({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string
  value: number
  setValue: (value: number) => void
  min: number
  max: number
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-slate-200">{label}</span>
        <span className="font-semibold text-cyan-200">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
      />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
