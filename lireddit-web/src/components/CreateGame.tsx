import Game from './Game'
import ValidatedInput from './ValidatedInput'
import { GameProps, GameState } from './Game'
import { ValidatedInputState } from './ValidatedInput';
import { generateGrid } from '../utils'
import { FlexCol } from './Layout';
import ValidatedInputForm from './ValidatedInputForm';


interface CreateGameProps {
  /**
   * How wide and long to make the game board.
   */
  nVerticalCells: number;
  nHorizontalCells: number;
}
  
type CreateGameState = {name: string, description: string} & GameState


class CreateGame extends Game<CreateGameProps, CreateGameState> {

  initialGridState?: boolean[][];
  nameInputData: ValidatedInputState;
  descriptionInputData: ValidatedInputState;

  constructor(props: CreateGameProps) {
    const gameProps: GameProps = {
      grid: generateGrid(props.nVerticalCells, props.nHorizontalCells),
      name: "",
      description: "",
    }
    super(gameProps);
    this.nameInputData = ValidatedInput.genInitState();
    this.descriptionInputData = ValidatedInput.genInitState();

  }

  private async validateNameInput(input: string) {
    if (input.length < 25) {
      return {error: false, message: "Name is valid."}
    } else {
      return {error: true, message: "Name is too long."}
    }
  }

  private async validateDescriptionInput(input: string) {
    if (input.length < 80) {
      return {error: false, message: "Description is valid."}
    } else {
      return {error: true, message: "Description is too long."}
    }
  }

  override render() {
    return (
      <FlexCol>
        {this.renderEncapsulatedGrid()}
        <ValidatedInputForm
          inputFieldNames={["Board Name", "Board Description"]}
          inputFieldValues={["", ""]}
          fieldNameFontFamily="Apple Chancery, cursive"
          fieldNameFontSize="30px"
          inputFieldValidations={
            [this.validateNameInput, this.validateDescriptionInput]
          }
          submissionButtonName="Save Board"
        />
      </FlexCol>
    )
  }
}

export default CreateGame