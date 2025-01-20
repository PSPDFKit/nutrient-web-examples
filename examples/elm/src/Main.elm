port module Main exposing (Annotation, Flags, Model, Msg(..), Rect, ViewState, annotate, configure, init, main, update, view)

import Browser
import Html exposing (Html, button, div, footer, text)
import Html.Attributes exposing (id, style)
import Html.Events exposing (onClick)



-- MODEL


type alias Model =
    { document : String
    , container : String
    , viewState : ViewState
    , annotations : List Annotation
    }


type alias ViewState =
    { currentPageIndex : Int
    , sidebarMode : String
    }


type alias Annotation =
    { pageIndex : Int
    , text :
        { format: String
        , value: String
        }
    , fontSize : Int
    , isBold : Bool
    , fontColor : String
    , backgroundColor : String
    , horizontalAlign : String
    , verticalAlign : String
    , boundingBox : Rect
    }


type alias Rect =
    { left : Int
    , top : Int
    , width : Int
    , height : Int
    }

type alias Flags =
    { }

init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        model =
            { document = "example.pdf"
            , container = "#PSPDFKitContainer"
            , annotations = []
            , viewState =
                { currentPageIndex = 1
                , sidebarMode = "THUMBNAILS"
                }
            }
    in
    ( model, configure model )



-- UPDATE


type Msg
    = SetConfig
    | CreateAnnotation


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetConfig ->
            ( model, configure model )

        CreateAnnotation ->
            let
                annotation =
                    { pageIndex = 1
                    , text =
                        { format = "plain"
                        , value = "Hello from Elm 🌳"
                        }
                    , fontSize = 50
                    , isBold = True
                    , fontColor = "WHITE"
                    , backgroundColor = "GREEN"
                    , horizontalAlign = "center"
                    , verticalAlign = "center"
                    , boundingBox =
                        { left = 100
                        , top = 100
                        , width = 500
                        , height = 200
                        }
                    }
            in
            ( model, annotate { model | annotations = [ annotation ] } )



-- PORT


port configure : Model -> Cmd msg


port annotate : Model -> Cmd msg



-- VIEW


view model =
    div
        []
        [ div [ id "PSPDFKitContainer", style "height" "90vh" ] []
        , footer [ style "text-align" "center", style "line-height" "10vh" ]
            [ button [ onClick CreateAnnotation ] [ text "Create Annotation" ]
            ]
        ]



-- PROGRAM


main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
