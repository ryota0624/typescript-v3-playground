type CreativeID = string;

interface Creative {
  readonly id: CreativeID
  readonly name: string
  readonly type: unknown
}

enum CreativeType {
  Infeed = "Infeed",
  Display = "Display"
};


interface CreativeInfeed extends Creative {
  readonly text: string;
  readonly imageUrl: string;
  readonly type: typeof CreativeType.Infeed
}

interface CreativeDisplay extends Creative {
  readonly imageUrl: string;
  readonly type: typeof CreativeType.Display
}

type UnionCreative = CreativeInfeed | CreativeDisplay;

function showCreative(creative: UnionCreative): string {
  switch (creative.type) {
    case CreativeType.Display: {
      return creative.imageUrl
    }
    case CreativeType.Infeed: {
      return creative.text;
    }
  }
}