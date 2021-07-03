package controllers

import (
	"github.com/labstack/echo"
	"github.com/yot-sailing/TSUNTSUN/domain"
	"github.com/yot-sailing/TSUNTSUN/interfaces/database"
	"github.com/yot-sailing/TSUNTSUN/usecase"
)

type TagController struct {
	Interactor usecase.TagInteractor
}

func NewTagController(sqlHandler database.SqlHandler) *TagController {
	return &TagController{
		Interactor: usecase.TagInteractor{
			TagRepository: &database.TagRepository{
				SqlHandler: sqlHandler,
			},
		},
	}
}

func (controller *TagController) CreateTag(c echo.Context, userID int) int {
	tag := domain.Tag{}
	c.Bind(&tag)
	tagID := controller.Interactor.Add(tag)

	var tagIDs []int
	tagIDs = append(tagIDs, tagID)
	tags := controller.GetTags(tagIDs)

	c.JSON(201, tags)
	return tagID
}

// 複数のtagIDからタグを取得
func (controller *TagController) GetTags(tagIDs []int) []domain.Tag {
	res := controller.Interactor.GetInfo(tagIDs)
	return res
}

func (controller *TagController) Delete(id int) {
	controller.Interactor.Delete(id)
}
