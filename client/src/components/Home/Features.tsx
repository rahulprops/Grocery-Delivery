import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className="mb-10 bg-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {heroSectionData.hero_features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="flex items-start p-5 gap-4"
              >
                {/* Icon */}
                <div className="shrink-0 size-11 flex items-center justify-center rounded-full bg-orange-50 text-app-orange">
                  <Icon className="size-5" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;